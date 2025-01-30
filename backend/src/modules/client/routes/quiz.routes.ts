import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuizById,
  getQuizes,
  getQuizQuestionById,
  getResutls,
  submitQuiz,
  updateExistingQuestions,
  updateQuizDetails,
} from "../controllers/quiz.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authMiddleware, createQuiz);
router.get("/list", authMiddleware, getQuizes);
router.get("/:id", authMiddleware, getQuizById);
router.get("/:id/questions", authMiddleware, getQuizQuestionById);
router.patch("/:id", authMiddleware, updateQuizDetails);
router.patch("/:id/questions", authMiddleware, updateExistingQuestions);
router.delete("/:id", authMiddleware, deleteQuiz);

router.post("/:id/submit", authMiddleware, submitQuiz);
router.get("/:id/attempts/:attemptId", authMiddleware, getResutls);

export default router;
