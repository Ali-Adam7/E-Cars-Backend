import { User } from "@prisma/client";
import { injectable } from "inversify";
import { IAuthRepository } from "../interfaces/Authentication/IAuthRepository";
import RegisterUserDTO from "../interfaces/Authentication/RegisterUserDTO";
import prisma from "../external_services/prismClient";
@injectable()
export class AuthPrismaRepository implements IAuthRepository {
  registerUser = async (user: RegisterUserDTO) => {
    try {
      return (await prisma.user.create({ data: { ...user, role: "user" } })) as User;
    } catch (error) {
      throw error;
    }
  };
  getUserByEmail = async (email: string) => {
    try {
      return (await prisma.user.findUnique({ where: { email: email } })) as User;
    } catch (error) {
      throw error;
    }
  };

  getUserName = async (id: number) => {
    try {
      return (await prisma.user.findUnique({ where: { id: id }, select: { name: true } })) as User;
    } catch (error) {
      throw error;
    }
  };
}
