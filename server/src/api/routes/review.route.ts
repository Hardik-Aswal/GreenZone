import { Router } from "express";
import { handleError } from "../../utils/response";
import * as reviewController from "../controllers/review.controller";

const router = Router();

router.get("/product/:productId", handleError(reviewController.getByProduct));
router.post("/", handleError(reviewController.createReview));

export default router;
