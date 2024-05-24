import { injectable } from "inversify";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import prisma from "../../../third-party/prisma/prismClient";
import createError from "http-errors";
import CreateUserDTO from "../DTOs/CreateUserDTO";

@injectable()
export class AuthPrismaRepository implements IAuthRepository {
  registerUser = async (user: CreateUserDTO) => {
    try {
      return await prisma.user.create({ data: { ...user, role: "user" } });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw createError(400, "Email already registered");
      }
      throw error;
    }
  };
  getUserByEmail = async (email: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) throw createError(401, "Wrong Credentials");
      return user;
    } catch (error) {
      throw error;
    }
  };

  getUserName = async (id: number) => {
    try {
      return (await prisma.user.findUnique({ where: { id: id }, select: { name: true } }))?.name;
    } catch (error) {
      throw createError(400, "User not found");
    }
  };
}
