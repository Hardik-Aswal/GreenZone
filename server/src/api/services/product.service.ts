import { db } from "../../db/drizzle";
import { products, productRelations } from "../../db/schemas/product";
import { reviews } from "../../db/schemas/review";
import { eq } from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";
import axios from 'axios';

type NewProduct = InferInsertModel<typeof products>;

export async function getAllProducts() {
  const allProducts = await db.select().from(products);
  const allReviews = await db.select().from(reviews);

  const byProduct: Record<string, typeof allReviews> = {};
  allReviews.forEach((r) => {
    (byProduct[r.productId] ??= []).push(r);
  });

  return allProducts.map((p) => ({
    ...p,
    reviews: byProduct[p.id] || [],
    isBestSeller: Math.random() < 0.5,
  }));
}

export async function getProductById(id: string) {
  const rows = await db
    .select({
      product: products,
      review: reviews,
    })
    .from(products)
    .leftJoin(reviews, eq(reviews.productId, products.id))
    .where(eq(products.id, id));
  const { product } = rows[0];
  const allReviews = rows.map((r) => r.review);
  return { ...product, reviews: allReviews, isBestSeller: Math.random() < 0.5 };
}

export async function createProduct(data: NewProduct) {
  const [created] = await db.insert(products).values(data).returning();
  return created;
}

export async function updateProduct(id: string, data: Partial<typeof products>) {
  const [updated] = await db.update(products).set(data).where(eq(products.id, id)).returning();
  return updated;
}

export async function deleteProduct(id: string) {
  const { rowCount } = await db.delete(products).where(eq(products.id, id)).execute();
  return rowCount > 0;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type Coordinate = [number, number];

interface Order {
  orderId: string;
  lat: number;
  lng: number;
}

const ordersByPincode: Map<number, Map<string, Set<string>>> = new Map();

// Helper to convert lat/lng to a unique string key
const coordKey = (lat: number, lng: number) => `${lat},${lng}`;

function addOrder(orderId: string, pincode: number, lat: number, lng: number) {
  if (!ordersByPincode.has(pincode)) {
    ordersByPincode.set(pincode, new Map());
  }

  const pincodeMap = ordersByPincode.get(pincode)!;
  const key = coordKey(lat, lng);
  if (!pincodeMap.has(key)) {
    pincodeMap.set(key, new Set());
  }

  pincodeMap.get(key)!.add(orderId);
}



const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

// Returns travel distance between two coordinates using Google Distance Matrix API
async function getDistance(from: Coordinate, to: Coordinate): Promise<number> {
  const origins = `${from[0]},${from[1]}`;
  const destinations = `${to[0]},${to[1]}`;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${GOOGLE_MAPS_API_KEY}`;

  const res = await axios.get(url);
  const distance = res.data.rows[0].elements[0].distance.value; // in meters
  return distance;
}

interface MSTEdge {
  from: Coordinate;
  to: Coordinate;
  weight: number;
}

class DSU {
  parent: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  find(x: number): number {
    return this.parent[x] === x ? x : (this.parent[x] = this.find(this.parent[x]));
  }
  union(x: number, y: number): boolean {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false;
    this.parent[px] = py;
    return true;
  }
}

export async function computeMSTWithAPI(
  locations: Coordinate[]
): Promise<{ edges: MSTEdge[]; totalCost: number }> {
  const n = locations.length;
  const edgePromises: Promise<MSTEdge>[] = [];

  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      edgePromises.push(
        getDistance(locations[i], locations[j]).then((dist) => ({
          from: locations[i],
          to: locations[j],
          weight: dist
        }))
      );
    }
  }

  const allEdges = await Promise.all(edgePromises);
  allEdges.sort((a, b) => a.weight - b.weight);

  const dsu = new DSU(n);
  const coordToIndex = new Map<string, number>(
    locations.map((loc, idx) => [loc.toString(), idx])
  );

  const mst: MSTEdge[] = [];
  let totalCost = 0;

  for (const edge of allEdges) {
    const u = coordToIndex.get(edge.from.toString())!;
    const v = coordToIndex.get(edge.to.toString())!;
    if (dsu.union(u, v)) {
      mst.push(edge);
      totalCost += edge.weight;
    }
  }

  return { edges: mst, totalCost };
}

export async function processAllPincodes() {
  const result: Record<number, { edges: MSTEdge[]; totalCost: number }> = {};

  for (const [pincode, coordMap] of ordersByPincode.entries()) {
    const coords: Coordinate[] = [...coordMap.keys()].map((s) => {
      const [lat, lng] = s.split(',').map(Number);
      return [lat, lng];
    });

    const mstResult = await computeMSTWithAPI(coords);
    result[pincode] = mstResult;
  }

  return result;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type Box = [number, number, number];

export type CuboidResult = {
  length: number;
  breadth: number;
  height: number;
  surfaceArea: number;
};

function surfaceArea(L: number, B: number, H: number): number {
  return 2 * (L * B + B * H + L * H);
}

function generateRotations(box: Box): Box[] {
  const [l, b, h] = box;
  const dims = [l, b, h];
  const rotations = new Set<string>();

  function permute(arr: number[], l: number, r: number) {
    if (l === r) {
      rotations.add(arr.join(","));
    } else {
      for (let i = l; i <= r; i++) {
        [arr[l], arr[i]] = [arr[i], arr[l]];
        permute(arr, l + 1, r);
        [arr[l], arr[i]] = [arr[i], arr[l]];
      }
    }
  }

  permute(dims, 0, 2);
  return Array.from(rotations).map((s) => s.split(",").map(Number) as Box);
}

export async function computeMinimumSurfaceCuboid(boxes: Box[]): Promise<CuboidResult> {
  const n = boxes.length;
  const allRotations: Box[][] = boxes.map(generateRotations);

  let minSurface = Infinity;
  let bestCuboid: Box = [0, 0, 0];

  function backtrack(depth: number, used: boolean[], current: Box[]) {
    if (depth === n) {
      let L = 0, B = 0, H = 0;
      for (const [l, b, h] of current) {
        L = Math.max(L, l);
        B = Math.max(B, b);
        H += h;
      }
      const sa = surfaceArea(L, B, H);
      if (sa < minSurface) {
        minSurface = sa;
        bestCuboid = [L, B, H];
      }
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        used[i] = true;
        for (const rot of allRotations[i]) {
          current.push(rot);
          backtrack(depth + 1, used, current);
          current.pop();
        }
        used[i] = false;
      }
    }
  }

  const used = Array(n).fill(false);
  backtrack(0, used, []);

  const [length, breadth, height] = bestCuboid;
  return { length, breadth, height, surfaceArea: minSurface };
}
