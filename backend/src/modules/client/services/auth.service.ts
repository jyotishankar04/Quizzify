import prisma from "../../../config/prisma.config";
import bcrypt from "bcrypt";
import { IUserType } from "../../../types/user.client.types";
import jwt, { decode } from "jsonwebtoken";
import { _config } from "../../../config/env.config";
interface IAuthTokenParams {
  email: string;
  id: string;
}

const checkIsUserExist = async (email: string): Promise<IUserType | null> => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      avatar: true,
      email: true,
      password: true,
      name: true,
      updatedAt: true,
      createdAt: true,
    },
  });

  if (!user) {
    return null;
  }
  return user as IUserType;
};

const createUser = async (user: {
  email: string;
  name: string;
  password: string;
}): Promise<any> => {
  const createdUser = await prisma.users.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
      avatar:
        "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png",
    },
    select: {
      id: true,
      avatar: true,
      email: true,
      password: false,
      name: true,
      updatedAt: true,
      createdAt: true,
    },
  });
  return createdUser;
};

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}): Promise<boolean> => {
  if (!password || !hashedPassword) {
    throw new Error("Both password and hashedPassword are required");
  }
  return await bcrypt.compare(password, hashedPassword);
};

const generateAuthToken = (params: IAuthTokenParams): string => {
  const token = jwt.sign({ params }, _config.JWT_SECRET as string, {
    expiresIn: "30d",
  });
  return token;
};
const decodeAuthToken = (token: string): IAuthTokenParams => {
  const decoded = jwt.verify(token, _config.JWT_SECRET as string) as {
    params: IAuthTokenParams;
  };

  return {
    id: decoded.params.id,
    email: decoded.params.email,
  };
};

export {
  checkIsUserExist,
  createUser,
  hashPassword,
  comparePassword,
  generateAuthToken,
  decodeAuthToken,
};
