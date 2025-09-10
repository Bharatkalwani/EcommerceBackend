import { Router } from "express";
import { registerUser, getUsers } from "../controllers/userController";

const router = Router();

router.post("/register", registerUser);
router.get("/login", getUsers);

export default router;
