import AuthenticatedUserDTO from "../DTOs/AuthenticatedUserDTO";
import CreateUserDTO from "../DTOs/CreateUserDTO";
import DBUserDTO from "../DTOs/DBUserDTO";

export interface IAuthRepository {
  registerUser(user: CreateUserDTO): Promise<DBUserDTO>;
  getUserByEmail(email: string): Promise<AuthenticatedUserDTO>;
  getUserName(id: number): Promise<string | undefined>;
}
