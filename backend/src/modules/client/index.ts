import express from "express";
import authRoutes from "./routes/auth.routes";
import quizRoutes from "./routes/quiz.routes";
// src/modules/client/index.ts

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/quiz", quizRoutes);
export default router;
