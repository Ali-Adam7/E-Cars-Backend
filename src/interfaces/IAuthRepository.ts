import User from "../entities/User";
import RegisterUserDTO from "./DTOs/RegisterUserDTO";

export interface IAuthRepository {
  registerUser(user: RegisterUserDTO): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserName(id: number): Promise<User>;
}