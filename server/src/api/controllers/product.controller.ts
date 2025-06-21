import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { success, error } from "../../utils/response";

export async function getAllProducts(_req: Request, res: Response) {
  const products = await productService.getAllProducts();
  return success({ message: "Products Fetched Successfully", products }, 200);
}

export async function getProductById(req: Request, res: Response) {
  const product = await productService.getProductById(req.params.id);
  if (!product) return error("Product not found", 404);
  return success({ message: "Product found", product }, 200);
}

export async function createProduct(req: Request, res: Response) {
  const data = req.body;
  const product = await productService.createProduct(data);
  return success({ message: "Product Created", product }, 200);
}

export async function updateProduct(req: Request, res: Response) {
  const updated = await productService.updateProduct(req.params.id, req.body);
  if (!updated) return error("Product not found", 404);
  return success({ message: "Product Updated", updated }, 200);
}

export async function deleteProduct(req: Request, res: Response) {
  const deleted = await productService.deleteProduct(req.params.id);
  if (!deleted) return error("Product not found", 404);
  return success({ message: "Product Deleted", deleted }, 200);
}
