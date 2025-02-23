import express from "express";
import authRoutes from "./routes/auth.routes";
import quizRoutes from "./routes/quiz.routes";
import userRoutes from "./routes/user.routes";
import statsRoutes from "./routes/stats.routes";
import settingsRoutes from "./routes/settings.routes";
import  supportRoutes from "./routes/support.route";


// src/modules/client/index.ts

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/quiz", quizRoutes);
router.use("/user", userRoutes);
router.use("/stats", statsRoutes);
router.use("/settings", settingsRoutes);
router.use("/support",supportRoutes);

export default router;
