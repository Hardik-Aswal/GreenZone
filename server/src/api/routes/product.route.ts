import { Router } from "express";
import { handleError } from "../../utils/response";
import * as productController from "../controllers/product.controller";

const router = Router();



router.get("/", handleError(productController.getAllProducts));
router.get("/:id", handleError(productController.getProductById));
router.post("/", handleError(productController.createProduct));
router.put("/:id", handleError(productController.updateProduct));
router.delete("/:id", handleError(productController.deleteProduct));



export default router;
