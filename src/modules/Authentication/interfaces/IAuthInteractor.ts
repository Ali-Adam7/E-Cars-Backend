import UserDataDTO from "../DTOs/RegisterUserDTO";
import User from "../entities/User";

export interface IAuthInteractor {
  registerUser(data: UserDataDTO): Promise<User>;
  authenticateUser(email: string, plainTextPassword: string): Promise<User>;
  refreshToken(token: string): string;
  getUserName(id: number): Promise<string | undefined>;
}
