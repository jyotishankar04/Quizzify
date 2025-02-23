import { Router } from "express";
import {
  login,
  register,
  logout,
  getSession, updatePassword,
} from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/session", authMiddleware, getSession);
router.post("/logout", logout);
router.put("/password/update", authMiddleware, updatePassword);

export default router;
