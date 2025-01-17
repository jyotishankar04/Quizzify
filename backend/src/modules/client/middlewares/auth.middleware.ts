import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { decodeAuthToken } from "../services/auth.service";
import createHttpError from "http-errors";
import { ICustomRequest } from "../../../types/client.types";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return next(createHttpError(400, "Access Denied!, Token is missing"));
  }

  try {
    const { id, email } = decodeAuthToken(token);
    const _req = req as ICustomRequest;
    _req.user = {
      id,
      email,
    };

    next();
  } catch (err) {
    return next(createHttpError(400, "Access Denied!, Invalid Token"));
  }
};

export default authMiddleware;
