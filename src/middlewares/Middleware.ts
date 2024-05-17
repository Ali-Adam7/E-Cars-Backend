import { inject, injectable } from "inversify";

import { INTERFACE_TYPE } from "../config/DI";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { ICrypt } from "../modules/Authentication/interfaces/ICrypt";
import { IToken } from "../modules/Authentication/interfaces/IToken";

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