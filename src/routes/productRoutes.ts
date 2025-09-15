import { Router } from "express";
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
