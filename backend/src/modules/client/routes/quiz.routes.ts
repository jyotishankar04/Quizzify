import express from "express";
import { createQuiz } from "../controllers/quiz.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authMiddleware, createQuiz);

export default router;
