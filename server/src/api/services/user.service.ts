import bcrypt from 'bcrypt';
import { db } from '../../db/drizzle';
import { userProfile, users } from '../../db/schema';
import { eq } from 'drizzle-orm';



// export type Coordinate = [number, number];

export async function createUserService(email : string, password : string, name: string, role : string){
       
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    
    if (existingUser.length > 0) {
        return null; 
    }

    const passwordHash = await bcrypt.hash(password, 10);
        
    const newUser = await db.insert(users).values({
      email,
      passwordHash,
      name,
      role: role as "customer" | "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt
    });

    return newUser[0];

}


export async function getUserByEmail(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user[0] || null;
}

// maximizing ecoscore for a given budget

// dsu based approach


// export type Coordinate = [number, number];

// type Coordinate = [number, number];

// interface Order {
//   orderId: string;
//   lat: number;
//   lng: number;
// }

// const ordersByPincode: Map<number, Map<string, Set<string>>> = new Map();

// // Helper to convert lat/lng to a unique string key
// const coordKey = (lat: number, lng: number) => `${lat},${lng}`;

// function addOrder(orderId: string, pincode: number, lat: number, lng: number) {
//   if (!ordersByPincode.has(pincode)) {
//     ordersByPincode.set(pincode, new Map());
//   }

//   const pincodeMap = ordersByPincode.get(pincode)!;
//   const key = coordKey(lat, lng);
//   if (!pincodeMap.has(key)) {
//     pincodeMap.set(key, new Set());
//   }

//   pincodeMap.get(key)!.add(orderId);
// }


// const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

// // Returns travel distance between two coordinates using Google Distance Matrix API
// async function getDistance(from: Coordinate, to: Coordinate): Promise<number> {
//   const origins = `${from[0]},${from[1]}`;
//   const destinations = `${to[0]},${to[1]}`;

//   const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${GOOGLE_MAPS_API_KEY}`;

//   const res = await axios.get(url);
//   const distance = res.data.rows[0].elements[0].distance.value; // in meters
//   return distance;
// }

// interface MSTEdge {
//   from: Coordinate;
//   to: Coordinate;
//   weight: number;
// }

// class DSU {
//   parent: number[];
//   constructor(n: number) {
//     this.parent = Array.from({ length: n }, (_, i) => i);
//   }
//   find(x: number): number {
//     return this.parent[x] === x ? x : (this.parent[x] = this.find(this.parent[x]));
//   }
//   union(x: number, y: number): boolean {
//     const px = this.find(x), py = this.find(y);
//     if (px === py) return false;
//     this.parent[px] = py;
//     return true;
//   }
// }

// export async function computeMSTWithAPI(
//   locations: Coordinate[]
// ): Promise<{ edges: MSTEdge[]; totalCost: number }> {
//   const n = locations.length;
//   const edgePromises: Promise<MSTEdge>[] = [];

//   for (let i = 0; i < n; ++i) {
//     for (let j = i + 1; j < n; ++j) {
//       edgePromises.push(
//         getDistance(locations[i], locations[j]).then((dist) => ({
//           from: locations[i],
//           to: locations[j],
//           weight: dist
//         }))
//       );
//     }
//   }

//   const allEdges = await Promise.all(edgePromises);
//   allEdges.sort((a, b) => a.weight - b.weight);

//   const dsu = new DSU(n);
//   const coordToIndex = new Map<string, number>(
//     locations.map((loc, idx) => [loc.toString(), idx])
//   );

//   const mst: MSTEdge[] = [];
//   let totalCost = 0;

//   for (const edge of allEdges) {
//     const u = coordToIndex.get(edge.from.toString())!;
//     const v = coordToIndex.get(edge.to.toString())!;
//     if (dsu.union(u, v)) {
//       mst.push(edge);
//       totalCost += edge.weight;
//     }
//   }

//   return { edges: mst, totalCost };
// }

// export async function processAllPincodes() {
//   const result: Record<number, { edges: MSTEdge[]; totalCost: number }> = {};

//   for (const [pincode, coordMap] of ordersByPincode.entries()) {
//     const coords: Coordinate[] = [...coordMap.keys()].map((s) => {
//       const [lat, lng] = s.split(',').map(Number);
//       return [lat, lng];
//     });

//     const mstResult = await computeMSTWithAPI(coords);
//     result[pincode] = mstResult;
//   }

//   return result;
// }


export async function getUserById(userId: string) {
    const user = await db.select().from(userProfile).where(eq(userProfile.userId, userId)).limit(1);
    return user[0] || null;
}