import { inject, injectable } from "inversify";
import { IToken } from "../interfaces/Authentication/IToken";
import { ICrypt } from "../interfaces/Authentication/ICrypt";
import { INTERFACE_TYPE } from "../config/DI";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

@injectable()
export class Middleware {
  private token: IToken;
  private crypt: ICrypt;
  constructor(@inject(INTERFACE_TYPE.Token) token: IToken, @inject(INTERFACE_TYPE.Crypt) crypt: ICrypt) {
    this.token = token;
    this.crypt = crypt;
  }
  isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { accessToken } = req.body;
      const isAdmin = this.token.isAdmin(accessToken);
      if (!isAdmin) throw createError(401, "Unauthorized");
      next();
    } catch (e) {
      throw e;
    }
  }
}
