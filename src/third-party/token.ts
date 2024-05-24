import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { refreshTokenKey, accessTokenKey } from "../config/config";

import createError from "http-errors";
import { IToken } from "../modules/Authentication/interfaces/IToken";
import AuthenticatedUserDTO from "../modules/Authentication/DTOs/AuthenticatedUserDTO";

@injectable()
export class Token implements IToken {
  verify(token: string): AuthenticatedUserDTO | null {
    try {
      const data = jwt.verify(token, accessTokenKey) as AuthenticatedUserDTO;
      return data;
    } catch (e: any) {
      throw createError(401, e.message);
    }
  }
  refresh(refreshToken: string): string {
    try {
      const verified = jwt.verify(refreshToken, refreshTokenKey) as AuthenticatedUserDTO;
      if (!verified) {
        throw createError(401, "Refresh Token Expired");
      }
      const { iat, exp, ...data } = verified;
      const accessToken = jwt.sign(data, accessTokenKey, { expiresIn: "1h", algorithm: "RS256" });
      return accessToken;
    } catch (e: any) {
      throw createError(401, e.message);
    }
  }
  sign(data: any): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(data, accessTokenKey, { expiresIn: "1h", algorithm: "RS256" });
    const refreshToken = jwt.sign(data, refreshTokenKey, { expiresIn: "7d", algorithm: "RS256" });
    return { accessToken: accessToken, refreshToken: refreshToken };
  }
  isAdmin(accessToken: string) {
    try {
      const { role } = this.verify(accessToken) as AuthenticatedUserDTO;
      return role === "admin" ? true : false;
    } catch (e: any) {
      throw createError(401, e.message);
    }
  }
}
