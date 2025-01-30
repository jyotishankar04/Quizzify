import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { getDashStats } from "../controllers/stats.controller";

const router = Router();

router.use(authMiddleware);

router.get("/dashboard", getDashStats);

export default router;
