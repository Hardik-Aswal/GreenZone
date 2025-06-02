import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";




const sql = neon(process.env.NEXT_PUBLIC_NEON_DB_URI!);
export const db = drizzle({ client: sql });