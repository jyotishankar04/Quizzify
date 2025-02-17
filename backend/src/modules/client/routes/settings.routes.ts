import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.put("/", authMiddleware, (req, res): any => {
  return res.status(200).json({
    success: true,
    message: "Settings updated successfully!",
  });
});

export default router;
