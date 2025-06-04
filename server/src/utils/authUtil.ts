import jwt from "jsonwebtoken";
import { Request } from "express";
import { db } from "../db/drizzle"; 
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

interface TokenPayload {
  id: string;
  role: "admin" | "customer";
  email: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || "your-fallback-secret";
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const secret = process.env.JWT_SECRET || "your-fallback-secret";
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const getTokenFromRequest = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
};

export const getUserFromToken = async (token: string) => {
  const payload = verifyToken(token);
  if (!payload) return null;
  
  const user = await db.select().from(users).where(eq(users.id, payload.id)).limit(1);
  return user[0] || null;
};