import dotenv from "dotenv"
dotenv .config()
import { db } from "../../db/drizzle";
import { products, productRelations } from "../../db/schemas/product";
import { reviews } from "../../db/schemas/review";
import { eq } from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";
import axios from 'axios';
import { groupOrders } from "../../db/schema";




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ------------------ Types ------------------
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
type Coordinate = [number, number];

class DSU {
  parent: number[];
  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
  }

  find(u: number): number {
    if (u !== this.parent[u]) {
      this.parent[u] = this.find(this.parent[u]);
    }
    return this.parent[u];
  }

  union(u: number, v: number): boolean {
    const pu = this.find(u);
    const pv = this.find(v);
    if (pu !== pv) {
      this.parent[pu] = pv;
      return true;
    }
    return false;
  }
}

async function getDistance(from: Coordinate, to: Coordinate): Promise<number> {
  const origins = `${from[0]},${from[1]}`;
  const destinations = `${to[0]},${to[1]}`;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data.rows[0].elements[0].distance.value; // in meters
  } catch (error) {
    console.error("Google Maps API Error:", error);
    return Infinity;
  }
}

export async function compute(pincode: number) {
  const groupData = await db
    .select()
    .from(groupOrders)
    .where(eq(groupOrders.pin_code, pincode.toString()));

  if (!groupData.length) return null;

  const coords: Coordinate[] = [];
  const coordToOrders = new Map<string, string[]>();

  for (const group of groupData) {
    const latArr = group.lat as string[];
    const lngArr = group.lng as string[];
    const orderIds = group.orderIds as string[];

    for (let i = 0; i < orderIds.length; i++) {
      const lat = parseFloat(latArr[i]);
      const lng = parseFloat(lngArr[i]);
      const coord: Coordinate = [lat, lng];
      const key = `${lat},${lng}`;

      coords.push(coord);
      if (!coordToOrders.has(key)) coordToOrders.set(key, []);
      coordToOrders.get(key)!.push(orderIds[i]);
    }
  }

  const edges: { from: number; to: number; distance: number }[] = [];

  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const dist = await getDistance(coords[i], coords[j]);
      edges.push({ from: i, to: j, distance: dist });
    }
  }
  const dsu = new DSU(coords.length);
  edges.sort((a, b) => a.distance - b.distance);

  let totalWeight = 0;
  const mstLinks: Coordinate[][] = [];

  for (const edge of edges) {
    if (dsu.union(edge.from, edge.to)) {
      totalWeight += edge.distance;
      mstLinks.push([coords[edge.from], coords[edge.to]]);
    }
  }

  return {
    distance: totalWeight,
    Links: mstLinks,
    coordToOrders: Object.fromEntries(coordToOrders),
  };
}

export async function getAllPincodesFromDB(): Promise<string[]> {
  const pincodes = await db.select({ pin_code: groupOrders.pin_code }).from(groupOrders);
  return pincodes.map((p) => p.pin_code).filter((p) => p !== null && p !== undefined);
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