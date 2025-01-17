import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { createQuizValidator } from "../../../validator/quiz.client.validator";
import { getQuizPrompt } from "../services/quiz.service";
import { model } from "../../../config/gemini.config";

const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { topic, topicContext, quizLength, quizLevel } = req.body;
    const validate = createQuizValidator.safeParse({
      topic,
      topicContext,
      quizLength,
      quizLevel,
    });

    if (!validate.success) {
      return next(createHttpError(400, validate.error.errors[0].message));
    }
    const prompt = getQuizPrompt({
      topic,
      topicContext,
      quizLength,
      quizLevel,
    });

    if (!prompt) {
      return next(createHttpError(500, "Error in creating the quiz!"));
    }
    console.log("prompt", prompt);
    const quiz = await model.generateContent(prompt);
    const extractJsonContent = (text: string): string[] => {
      const regex = /```json([\s\S]*?)```/g;

      const matches: string[] = [];
      let match;

      while ((match = regex.exec(text)) !== null) {
        matches.push(match[1].trim());
      }

      return matches;
    };
    const jsonContent = extractJsonContent(quiz.response.text());
    return res.status(201).json({
      success: "Quiz created successfully!",
      data: JSON.parse(jsonContent[0]),
    });
  } catch (error) {
    return next(createHttpError(400, "message"));
  }
};

export { createQuiz };
