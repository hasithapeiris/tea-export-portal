import express from "express";
import {
  loginUser,
  logoutUser,
  getMe,
  adminOnlyRoute,
  registerUser,
} from "../controllers/authController.js";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logoutUser);
router.get("/admin-only", authMiddleware, adminOnly, adminOnlyRoute);

export default router;
