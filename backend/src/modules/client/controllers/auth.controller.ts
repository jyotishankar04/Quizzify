import { NextFunction, Request, Response } from "express";
import {
  clientLoginValidator,
  clientRegisterValidator,
} from "../../../validator/auth.client.validator";
import createHttpError from "http-errors";
import {
  checkIsUserExist,
  comparePassword,
  createUser,
  generateAuthToken,
  hashPassword,
} from "../services/auth.service";

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
      return res.status(400).json({ message: "User does not exist" });
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
    });

    return res.status(200).json({
      success: "User logged in successfully!",
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

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Logout failed" });
  }
};
