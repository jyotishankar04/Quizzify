import { NextFunction, Request, Response } from "express";
import {
  clientLoginValidator,
  clientRegisterValidator,
  updatePasswordValidator,
} from "../../../validator/auth.client.validator";
import createHttpError from "http-errors";
import {
  checkIsUserExist,
  comparePassword,
  createUser,
  generateAuthToken,
  hashPassword,
} from "../services/auth.service";
import { ICustomRequest } from "../../../types/client.types";
import prisma from "../../../config/prisma.config";
import { _config } from "../../../config/env.config";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const body = req.body;

    const validate = clientRegisterValidator.safeParse(body);
    if (!validate.success) {
      return next(createHttpError(400, validate.error.errors[0].message));
    }
    const { email, password, name } = body;

    const isExist = await checkIsUserExist(email);
    if (isExist) {
      return next(createHttpError(400, "User already exists"));
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return next(createHttpError(500, "Error in creating the user!"));
    }

    const token = generateAuthToken({ id: user.id, email: user.email });

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    return res.status(201).json({
      success: "User created successfully!",
      data: {
        ...user,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "message"));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const validate = clientLoginValidator.safeParse({ email, password });
    if (!validate.success) {
      return next(createHttpError(400, validate.error.errors[0].message));
    }
    const user = await checkIsUserExist(email);
    if (!user) {
      return next(createHttpError(400, "User not found"));
    }

    const isPasswordValid = await comparePassword({
      password,
      hashedPassword: user.password,
    });
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateAuthToken({ id: user.id, email: user.email });

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "User authenticated successfully!",
      data: {
        ...user,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "message"));
  }
};

export const getSession = async (
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
    return res.status(200).json({
      success: true,
      message: "User authenticated successfully!",
      data: {
        ...userExist,
        password: "",
      },
    });
  } catch (error) {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    console.log(error);
    return next(createHttpError(400, "Authentication failed!"));
  }
};

export const updatePassword = async (
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
    const body = req.body;
    const validate = updatePasswordValidator.safeParse(body);

    if (!validate.success) {
      return next(createHttpError(400, validate.error.errors[0].message));
    }

    const { currentPassword, newPassword } = body;

    const isValidPassword = await comparePassword({
      password: currentPassword,
      hashedPassword: userExist.password,
    });

    if (!isValidPassword) {
      return next(createHttpError(400, "Invalid current password"));
    }
    if (currentPassword === newPassword) {
      return next(
        createHttpError(400, "New password cannot be same as current password")
      );
    }

    const hashedPassword = await hashPassword(newPassword);
    const result = await prisma.users.update({
      where: {
        id: userExist.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    if (!result) {
      return next(createHttpError(500, "Error in updating password"));
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
      data: {
        ...userExist,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(400, "message"));
  }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Logout failed!",
    });
  }
};
