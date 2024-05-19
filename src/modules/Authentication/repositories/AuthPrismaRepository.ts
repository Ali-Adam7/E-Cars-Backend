import { injectable } from "inversify";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import prisma from "../../../third-party/prismClient";
import createError from "http-errors";
import DBUserDTO from "../DTOs/DBUserDTO";
import CreateUserDTO from "../DTOs/CreateUserDTO";

@injectable()
export class AuthPrismaRepository implements IAuthRepository {
  registerUser = async (user: CreateUserDTO) => {
    try {
      return (await prisma.user.create({ data: { ...user, role: "user" } })) as DBUserDTO;
    } catch (error: any) {
      if (error.code === "P2002") {
        throw createError(400, "Email already registered");
      }
      throw error;
    }
  };
  getUserByEmail = async (email: string) => {
    try {
      return (await prisma.user.findUnique({ where: { email: email } })) as DBUserDTO;
    } catch (error) {
      throw error;
    }
  };

  getUserName = async (id: number) => {
    try {
      return (await prisma.user.findUnique({ where: { id: id }, select: { name: true } }))?.name;
    } catch (error) {
      throw error;
    }
  };
}
