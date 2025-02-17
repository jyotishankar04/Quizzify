import { NextFunction, Request, Response } from "express";
import { ICustomRequest } from "../../../types/client.types";
import { checkIsUserExist } from "../services/auth.service";
import createHttpError from "http-errors";
import prisma from "../../../config/prisma.config";
import {
  deleteOnCloudinary,
  uploadOnCloudinary,
} from "../../../utils/cloudinary.utils";
import { _CLOUDINARY_FOLDERS } from "../../../constants/cloudinary.constants";
import { userUpdateValidator } from "../../../validator/quiz.client.validator";
import { _socialUrlsTemplates } from "../../../constants/global.constants";

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

const uploadUserProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    const user = _req.user;
    const userExist = await checkIsUserExist(user.email);
    if (!userExist) {
      return next(createHttpError(404, "User not found"));
    }

    if (!_req.file) {
      return next(createHttpError(400, "File not found"));
    }
    const file: Express.Multer.File = _req.file;
    if (!userExist.avatar) {
      await deleteOnCloudinary(userExist.avatarId as string);
    }
    const result = await uploadOnCloudinary(
      file?.path as string,
      _CLOUDINARY_FOLDERS.USER_IMAGE
    );
    if (!result) {
      return next(createHttpError(400, "Image upload failed!"));
    }

    await prisma.users.update({
      where: {
        id: userExist.id,
      },
      data: {
        avatar: result.secure_url,
        avatarId: result.public_id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully!",
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "Image upload failed!"));
  }
};



const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const _req = req as ICustomRequest;
    const user = _req.user;
    const userExist = await checkIsUserExist(user.email);
    if (!userExist) {
      return next(createHttpError(404, "User not found"));
    }
    // const validate = userUpdateValidator.safeParse(req.body);
    // if (!validate.success) {
    //   console.log(validate.error);
    //   return next(createHttpError(400, validate.error.errors[0].message));
    // }

    const socialData = {
      instagram_url: req.body.instagram_username
        ? _socialUrlsTemplates.instagram + req.body.instagram_username
        : userExist.instagram_url,
      twitter_url: req.body.twitter_username
        ? _socialUrlsTemplates.twitter + req.body.twitter_username
        : userExist.twitter_url,
      github_url: req.body.github_username
        ? _socialUrlsTemplates.github + req.body.github_username
        : userExist.github_url,
      linkedin_url: req.body.linkedin_username
        ? _socialUrlsTemplates.linkedin + req.body.linkedin_username
        : userExist.linkedin_url,
    };

    const updatedUser = await prisma.users.update({
      where: {
        id: userExist.id,
      },
      data: {
        name: req.body.name || userExist.name,
        address: req.body.address || userExist.address,
        ...socialData,
        website_url: req.body.website_url || userExist.website_url,
      },
    });
    if (!updatedUser) {
      return next(createHttpError(400, "Unable to update the user profile!"));
    }
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully!",
      data: {
        ...updatedUser,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "Unable to update the user profile!"));
  }
};

export { getUserProfile, uploadUserProfileImage, updateUserProfile };
