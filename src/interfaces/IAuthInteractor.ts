import AuthenticatedUserDTO from "./DTOs/AuthenticatedUserDTO";
import RegisterUserDTO from "./DTOs/RegisterUserDTO";
import UserDataDTO from "./DTOs/UserDataDTO";

export interface IAuthInteractor {
  registerUser(data: UserDataDTO): Promise<AuthenticatedUserDTO>;
  authenticateUser(email: string, plainTextPassword: string): Promise<AuthenticatedUserDTO | null>;
}
