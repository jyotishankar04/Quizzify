import { users } from "@prisma/client";
export interface IUserType extends users {
  id: string;
  avatar: string;
  email: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
}
