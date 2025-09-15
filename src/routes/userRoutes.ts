import { Router } from "express";
import { register, login, forgotPassword, resetPassword, myProfile } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, myProfile);

export default router;
