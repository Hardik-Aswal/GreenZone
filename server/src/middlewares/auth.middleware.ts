import { Request, Response, NextFunction } from "express";
import { getTokenFromRequest, verifyToken } from "../utils/authUtil";
import { error } from "../utils/response";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: "admin" | "customer";
  };
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = getTokenFromRequest(req);
  
  if (!token) {
    return res.status(401).json(error("Authentication required", 401));
  }
  
  const payload = verifyToken(token);
  
  if (!payload) {
    return res.status(401).json(error("Invalid or expired token", 401));
  }
  

  req.user = {
    id: payload.id,
    email: payload.email,
    role: payload.role
  };
  
  next();
};

export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json(error("Authentication required", 401));
  }
  
  if (req.user.role !== "admin") {
    return res.status(403).json(error("Admin privileges required", 403));
  }
  
  next();
};


export const adminOnly = [authenticateUser, requireAdmin];