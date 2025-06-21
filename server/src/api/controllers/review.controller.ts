import { Request, Response } from "express";
import * as reviewService from "../services/review.service";
import { success, error } from "../../utils/response";

export async function getByProduct(req: Request, res: Response) {
  const reviews = await reviewService.getReviewsByProduct(req.params.productId);
  return success({ message: "Review Fetched Successfully", reviews }, 200);
}

export async function createReview(req: Request, res: Response) {
  const data = req.body;
  const review = await reviewService.createReview(data);
  return success({ message: "Review Created", review }, 200);
}
