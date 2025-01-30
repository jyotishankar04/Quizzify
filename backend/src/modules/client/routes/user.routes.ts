import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", getUserProfile);

export default router;
