import AuthenticatedUserDTO from "./AuthenticatedUserDTO";
import UserDataDTO from "./UserDataDTO";

export interface IAuthInteractor {
  registerUser(data: UserDataDTO): Promise<AuthenticatedUserDTO>;
  authenticateUser(email: string, plainTextPassword: string): Promise<AuthenticatedUserDTO | null>;
  refreshToken(token: string): string | null;
}
