import AuthenticatedUserDTO from "./DTOs/Authentication/AuthenticatedUserDTO";
import UserDataDTO from "./DTOs/Authentication/UserDataDTO";

export interface IAuthInteractor {
  registerUser(data: UserDataDTO): Promise<AuthenticatedUserDTO>;
  authenticateUser(email: string, plainTextPassword: string): Promise<AuthenticatedUserDTO | null>;
  refreshToken(token: string): string | null;
}
