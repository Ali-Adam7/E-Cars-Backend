import RegisterUserDTO from "../DTOs/RegisterUserDTO";
import User from "../entities/User";

export interface IAuthRepository {
  registerUser(user: RegisterUserDTO): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  getUserName(id: number): Promise<User>;
}