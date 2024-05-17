import { injectable } from "inversify";
import User from "../entities/User";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import RegisterUserDTO from "../DTOs/RegisterUserDTO";
import prisma from "../../../third-party/prismClient"
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
