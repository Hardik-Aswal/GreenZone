
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
const connectionString = process.env.NEON_DB_URI;
console.log(connectionString)
if (!connectionString) {
  throw new Error(
    "Database connection string not found. Please NEON_DB_URI environment variable."
  );
}

const sql = neon(connectionString);
export const db = drizzle({ client: sql });