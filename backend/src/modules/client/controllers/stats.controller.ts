import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { ICustomRequest } from "../../../types/client.types";
import prisma from "../../../config/prisma.config";

const getDashStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    let responseData = {};
    const _req = req as ICustomRequest;
    if (!_req.user) return next(createHttpError(400, "User not found"));
    const user = await prisma.users.findUnique({
      where: {
        id: _req.user.id,
      },
      include: {
        _count: {
          select: {
            Attempt: true,
            submissions: true,
            quizzes: true,
          },
        },
      },
    });
    if (!user) return next(createHttpError(400, "User not found"));
    responseData = {
      totalQuizes: user._count.quizzes,
      totalAttempts: user._count.Attempt,
      totalQuizPlayed: user._count.submissions,
    };

    const quizes = await prisma.quiz.findMany({
      where: {
        author: {
          id: _req.user.id,
        },
      },
      include: {
        Attempt: {
          select: {
            totalScore: true,
          },
        },
        submissions: {
          select: {
            avgScore: true,
            avgDuration: true,
          },
        },
        _count: true,
      },
    });
    if (!quizes) return next(createHttpError(400, "Quizes not found"));
    const totalCorrectAnswers = quizes.reduce(
      (total, quiz) =>
        total +
        quiz.Attempt.map((attempt) => attempt.totalScore).reduce(
          (total, score) => total + score,
          0
        ),
      0
    );

    responseData = {
      ...responseData,
      totalQuestionCreated: quizes
        .map((quiz) => quiz._count.questions)
        .reduce((total, count) => total + count, 0),
      totalCorrectAnswers,
    };

    const recentAttempts = await prisma.attempt.findMany({
      where: {
        submission: {
          user: {
            id: _req.user.id,
          },
        },
      },
      include: {
        submission: {
          include: {
            quiz: {
              select: {
                topic: true,
                topicContext: true,
                quizDuration: true,
                quizLevel: true,
                _count: {
                  select: {
                    questions: true,
                    Attempt: true,
                    submissions: true,
                  },
                },
                isPublic: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const recentQuizes = recentAttempts.map((attempt) => attempt.submission);
    responseData = {
      ...responseData,
      recentQuizes,
    };

    return res.status(200).json({
      success: true,
      message: "Stats fetched successfully!",
      data: responseData,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "Authentication failed!"));
  }
};

export { getDashStats };
