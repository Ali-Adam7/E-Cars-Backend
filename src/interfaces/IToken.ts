import AuthenticatedUserDTO from "./DTOs/Authentication/AuthenticatedUserDTO";

export interface IToken {
  sign(data: any): { accessToken: string; refreshToken: string };
  verify(token: string): AuthenticatedUserDTO | null;
  refresh(refreshToken: string): string | null;
}
