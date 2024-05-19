import AuthenticatedUserDTO from "../DTOs/DBUserDTO";

export interface IToken {
  sign(data: any): { accessToken: string; refreshToken: string };
  verify(token: string): AuthenticatedUserDTO | null;
  refresh(refreshToken: string): string;
  isAdmin(accessToken: string): boolean;
}
