// routes/cartRoutes.ts
import express from "express";
import { addToCart, getMyCart } from "../controllers/cartController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/addCart", protect, addToCart);
router.get("/myCart", protect, getMyCart);

export default router;
