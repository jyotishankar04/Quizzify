import express from "express";
import authRoutes from "./routes/auth.routes";
import quizRoutes from "./routes/quiz.routes";
import userRoutes from "./routes/user.routes";
import statsRoutes from "./routes/stats.routes";
// src/modules/client/index.ts

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/quiz", quizRoutes);
router.use("/user", userRoutes);
router.use("/stats", statsRoutes);
export default router;
