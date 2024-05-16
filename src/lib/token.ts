import { injectable } from "inversify";
import { IToken } from "../interfaces/IToken";
import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey } from "../utils/config";
import AuthenticatedUserDTO from "../interfaces/DTOs/Authentication/AuthenticatedUserDTO";

@injectable()
export class Token implements IToken {
  verify(token: string): AuthenticatedUserDTO | null {
    try {
      const data = jwt.verify(token, refreshTokenKey) as AuthenticatedUserDTO;
      return data;
    } catch (e) {
      return null;
    }
  }
  refresh(refreshToken: string): string | null {
    const verified = this.verify(refreshToken);
    if (!verified) return null;
    const { iat, exp, ...data } = verified;
    const accessToken = jwt.sign(data, accessTokenKey, { expiresIn: "1h", algorithm: "RS256" });
    return accessToken;
  }
  sign(data: any): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(data, accessTokenKey, { expiresIn: "1h", algorithm: "RS256" });
    const refreshToken = jwt.sign(data, refreshTokenKey, { expiresIn: "7d", algorithm: "RS256" });

    return { accessToken: accessToken, refreshToken: refreshToken };
  }
}
