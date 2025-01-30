import { Request, Response, NextFunction, text } from "express";
import createHttpError from "http-errors";
import secureJsonParse from "secure-json-parse";

import {
  createQuizValidator,
  jsonCreateQuizValidator,
  questionEditValidator,
} from "../../../validator/quiz.client.validator";
import { getQuizPrompt, pushQuizesToDb } from "../services/quiz.service";
import { model } from "../../../config/gemini.config";
import { ICustomRequest } from "../../../types/client.types";
import prisma from "../../../config/prisma.config";
import { checkIsUserExist } from "../services/auth.service";
import { Question } from "@prisma/client";

const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    if (!_req.user) return next(createHttpError(400, "User not found"));

    const existingUser = await checkIsUserExist(_req.user.email);
    if (!existingUser) return next(createHttpError(400, "User not found"));

    const { topic, topicContext, quizLength, quizLevel, duration } = req.body;

    const validate = createQuizValidator.safeParse({
      topic,
      topicContext,
      quizLength,
      quizLevel,
      duration: Number(duration),
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
    if (!prompt)
      return next(createHttpError(500, "Error in creating the quiz!"));

    const quizResponse = await model.generateContent(prompt);
    if (!quizResponse || !quizResponse.response) {
      return next(createHttpError(500, "Failed to generate quiz content."));
    }

    let parsedJson;
    try {
      parsedJson = secureJsonParse(quizResponse.response.text());
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log(parsedJson);
    const questions = parsedJson.questions.map((question: any) => ({
      text: question.text,
      Option: question.options.map((option: any) => ({
        text: option.text,
        isCorrect: option.isCorrect,
      })),
    }));
    const quiz = jsonCreateQuizValidator.safeParse({
      topic,
      topicContext,
      quizLength,
      quizLevel,
      author: {
        id: existingUser.id,
      },
      questions,
    });

    if (!quiz.success) {
      return next(createHttpError(400, quiz.error.errors[0].message));
    }

    const result = await pushQuizesToDb({
      topic,
      topicContext,
      quizLength,
      quizLevel,

      quizDuration: Number(duration),
      author: {
        id: existingUser.id,
      },
      questions,
    });

    return res.status(201).json({
      success: "Quiz created successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error in createQuiz:", error);
    return next(createHttpError(500, "Error in creating the quiz!"));
  }
};

const getQuizes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    if (!_req.user) return next(createHttpError(400, "User not found"));
    const user = prisma.users.findUnique({
      where: {
        id: _req.user.id,
      },
    });
    if (!user) return next(createHttpError(400, "User not found"));
    const quizes = await prisma.quiz.findMany({
      where: {
        author: {
          id: _req.user.id,
        },
      },
      include: {
        _count: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!quizes) return next(createHttpError(400, "Quizes not found"));
    return res.status(200).json({
      success: true,
      message: "Quizes fetched successfully!",
      data: quizes,
    });
  } catch (error) {
    console.error("Error in getQuizes:", error);
    return next(createHttpError(500, "Error in getting the quizes!"));
  }
};

const getQuizById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    if (!_req.user) return next(createHttpError(400, "User not found"));
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
      include: {
        _count: true,
        submissions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
            Attempt: {
              orderBy: {
                createdAt: "desc",
              },
              include: {
                users: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    if (!quiz) return next(createHttpError(400, "Quiz not found"));

    if (quiz.author.id !== _req.user.id)
      return next(createHttpError(400, "This quiz does not belong to you!"));

    return res.status(200).json({
      success: true,
      message: "Quiz fetched successfully!",
      data: quiz,
    });
  } catch (error) {
    console.error("Error in getQuizes:", error);
    return next(createHttpError(500, "Error in getting the quizes!"));
  }
};

const getQuizQuestionById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    if (!_req.user) return next(createHttpError(400, "User not found"));
    const { id } = req.params;
    if (!id) return next(createHttpError(400, "Question not found"));
    const questions = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
        _count: true,
      },
    });
    if (!questions) return next(createHttpError(400, "Question not found"));
    const data = questions.questions.map((question) => ({
      id: question.id,
      text: question.text,

      options: question.options.map((option) => ({
        id: option.id,
        text: option.text,
      })),
    }));
    return res.status(200).json({
      success: true,
      message: "Question fetched successfully!",
      data: { ...questions, questions: data },
    });
  } catch (error) {
    console.error("Error in getQuizes:", error);
    return next(createHttpError(500, "Error in getting the quizes!"));
  }
};

const submitQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const body = req.body;
    if (!body) return next(createHttpError(400, "Unable to submit the quiz!"));
    if (!body.duration || parseFloat(body.quration))
      return next(createHttpError(400, "Unable to submit the quiz!"));
    const _req = req as ICustomRequest;
    if (!_req.user) return next(createHttpError(400, "User not found"));
    const { id } = req.params;
    if (!id) return next(createHttpError(400, "Question not found"));
    const questions = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
        _count: true,
      },
    });

    if (!questions) return next(createHttpError(400, "Question not found"));
    const result = questions.questions.filter((question) => {
      const userAnswer = body[question.id];
      if (!userAnswer) return false;
      const correctAns = question.options.find((option) => option.isCorrect);
      return userAnswer === correctAns?.id;
    });
    const attempt = await prisma.attempt.create({
      data: {
        totalScore: result.length,
        totalQuestions: questions.questions.length,
        quizDuration: parseFloat(body.duration),
        Quiz: {
          connect: {
            id: id,
          },
        },
        users: {
          connect: {
            id: _req.user.id,
          },
        },
        submission: {
          connectOrCreate: {
            where: {
              userId_quizId: {
                userId: _req.user.id,
                quizId: id,
              },
            },
            create: {
              userId: _req.user.id,
              quizId: id,
            },
          },
        },
      },
    });

    if (!attempt)
      return next(createHttpError(400, "Unable to submit the quiz!"));

    return res.status(200).json({
      success: true,
      message: "Question submitted successfully!",
      data: attempt,
    });
  } catch (error) {
    console.error("Error in getQuizes:", error);
    return next(createHttpError(500, "Error in getting the quizes!"));
  }
};

const getResutls = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    if (!_req.user) return next(createHttpError(400, "User not found"));
    const { id: quizId, attemptId } = req.params;
    const results = await prisma.attempt.findUnique({
      where: {
        id: attemptId,
        quizId: quizId,
      },
      include: {
        submission: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!results) return next(createHttpError(400, "Results not found"));
    return res.status(200).json({
      success: true,
      message: "Results fetched successfully!",
      data: results,
    });
  } catch (error) {
    console.error("Error in getQuizes:", error);
    return next(createHttpError(500, "Error in getting the quizes!"));
  }
};

const updateQuizDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    const { id } = req.params;

    if (!_req.user) return next(createHttpError(400, "User not found"));
    const user = await prisma.users.findUnique({
      where: {
        id: _req.user.id,
      },
    });
    if (!user) return next(createHttpError(400, "User not found"));
    const quizData = await prisma.quiz.findUnique({
      where: {
        id: req.params.id,
        AND: {
          author: {
            id: _req.user.id,
          },
        },
      },
    });
    if (!quizData)
      return next(createHttpError(400, "This quiz does not belong to you!"));

    const { topic, topicContext, quizLength, quizLevel, duration } = req.body;
    const validate = createQuizValidator.safeParse({
      topic,
      topicContext,
      quizLength: Number(quizLength),
      quizLevel,
      duration: Number(duration),
    });
    if (!validate.success) {
      return next(createHttpError(400, validate.error.errors[0].message));
    }
    const quiz = await prisma.quiz.update({
      where: {
        id: id,
      },
      data: {
        topic,
        topicContext,
        quizLength: Number(quizLength),
        quizLevel,
        quizDuration: Number(duration),
      },
    });
    if (!quiz) return next(createHttpError(400, "Quiz not found"));

    return res.status(200).json({
      success: true,
      message: "Quiz updated successfully!",
      data: quiz,
    });
  } catch (error) {
    console.error("Error in getQuizes:", error);
    return next(createHttpError(500, "Error in getting the quizes!"));
  }
};

const updateExistingQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    const { id } = req.params;

    if (!_req.user) return next(createHttpError(400, "User not found"));
    const existingQuiz = await prisma.quiz.findUnique({
      where: {
        id: id,
        AND: {
          author: {
            id: _req.user.id,
          },
        },
      },
    });
    if (!existingQuiz)
      return next(createHttpError(400, "This quiz does not belong to you!"));

    const { questions } = req.body;
    const validate = questionEditValidator.safeParse(questions);
    console.log(validate.error);
    if (!validate.success) {
      return next(createHttpError(400, validate.error.errors[0].message));
    }

    const quiz = await prisma.question.updateMany({
      where: {
        id: {
          in: questions.map((question: any) => question.id),
        },
      },
      data: {
        text: {
          set: questions.map((question: any) => question.text),
        },
      },
    });
    if (!quiz) return next(createHttpError(400, "Error in updating Quiz!"));
    const updateOptions = await prisma.option.updateMany({
      where: {
        questionId: {
          in: questions.map((question: any) => question.id),
        },
      },
      data: {
        text: {
          set: questions.map((question: any) =>
            question.options.map((option: any) => option.text)
          ),
        },
        isCorrect: {
          set: questions.map((question: any) =>
            question.options.map((option: any) => option.isCorrect)
          ),
        },
      },
    });
    if (!updateOptions)
      return next(createHttpError(400, "Error in updating Quiz!"));

    return res.status(200).json({
      success: true,
      message: "Question updated successfully!",
      data: {
        id: existingQuiz.id,
      },
    });
  } catch (error) {
    console.error("Error in getQuizes:", error);
    return next(createHttpError(500, "Error in getting the quizes!"));
  }
};

const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    const { id } = req.params;
    if (!_req.user) return next(createHttpError(400, "User not found"));
    const user = await prisma.users.findUnique({
      where: {
        id: _req.user.id,
      },
    });
    if (!user) return next(createHttpError(400, "User not found"));
    const quizData = await prisma.quiz.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        author: true,
      },
    });
    if (!quizData) return next(createHttpError(400, "Quiz does not exist!"));

    if (quizData.author.id !== _req.user.id)
      return next(createHttpError(400, "This quiz does not belong to you!"));

    const transaction = await prisma.$transaction([
      prisma.option.deleteMany({
        where: {
          question: {
            quizId: id,
          },
        },
      }),
      prisma.question.deleteMany({
        where: {
          quizId: id,
        },
      }),
      prisma.attempt.deleteMany({
        where: {
          quizId: id,
        },
      }),
      prisma.submission.deleteMany({
        where: {
          Attempt: {
            every: {
              quizId: id,
            },
          },
        },
      }),
      prisma.quiz.delete({
        where: {
          id: id,
        },
      }),
    ]);

    if (!transaction) {
      return next(createHttpError(400, "Error in deleting the quiz!"));
    }

    return res.status(200).json({
      success: true,
      message: "Quiz deleted successfully!",
      data: transaction,
    });
  } catch (error) {
    console.error("Error in getQuizes:", error);
    return next(createHttpError(500, "Error in deleting the quiz!"));
  }
};

export {
  createQuiz,
  getQuizes,
  getQuizById,
  getQuizQuestionById,
  submitQuiz,
  getResutls,
  updateQuizDetails,
  updateExistingQuestions,
  deleteQuiz,
};
