import { db } from "../../db/drizzle";
import { products, productRelations } from "../../db/schemas/product";
import { reviews } from "../../db/schemas/review";
import { eq } from "drizzle-orm";
import { InferInsertModel } from "drizzle-orm";
import axios from 'axios';
import { groupOrders } from "../../db/schema";




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// ------------------ Types ------------------
export async function compute(pincode : number){
  
  const groupData = await db.select().from(groupOrders).where(eq(groupOrders.pin_code, pincode.toString()));
  return groupData

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