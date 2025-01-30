import { NextFunction, Request, Response } from "express";
import { ICustomRequest } from "../../../types/client.types";
import { checkIsUserExist } from "../services/auth.service";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma.config";

const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    const user = _req.user;
    const userExist = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
      include: {
        _count: true,
        submissions: true,
        Attempt: {
          orderBy: {
            createdAt: "desc",
          },
        },
        quizzes: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            _count: true,
            submissions: {
              include: {
                _count: true,
              },
            },
          },
        },
      },
    });

    if (!userExist) {
      return next(createHttpError(404, "User not found"));
    }

    const totalQuestionSubmisions = userExist.quizzes.reduce(
      (total, quiz) => total + quiz._count.submissions,
      0
    );

    return res.status(200).json({
      success: true,
      message: "User authenticated successfully!",
      data: {
        ...userExist,
        password: "",
        totalQuizPlayers: totalQuestionSubmisions,
      },
    });
  } catch (error) {
    res.clearCookie("authToken");
    console.log(error);
    return next(createHttpError(400, "Authentication failed!"));
  }
};

export { getUserProfile };
