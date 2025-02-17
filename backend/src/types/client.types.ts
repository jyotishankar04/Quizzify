import { Request } from "express";

export interface ICustomRequest extends Request {
  user: {
    id: string;
    email: string;
  };
  file?: Express.Multer.File;
}
