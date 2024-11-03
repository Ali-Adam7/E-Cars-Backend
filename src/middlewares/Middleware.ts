import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../config/DI";
import { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import { IToken } from "../interfaces/IToken";

@injectable()
export class Middleware {
  private token: IToken;

  constructor(@inject(INTERFACE_TYPE.Token) token: IToken) {
    this.token = token;
  }

  authenticateUser(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) return next();
    const user = this.token.verify(accessToken);
    req.user = user;
    next();
  }
  isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.cookies?.accessToken;
      const isAdmin = this.token.isAdmin(accessToken);
      if (!isAdmin) throw createError(401, "Unauthorized");
      next();
    } catch (e) {
      throw e;
    }
  }

  isAuthorized(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.userId);
      const accessToken = req.cookies?.accessToken;
      if (!accessToken) throw Error;
      const user = req.user;
      if (!(user?.id === id)) throw createError(401, "Unauthorized");
      next();
    } catch (e: any) {
      throw e;
    }
  }
  onError(e: HttpError, req: Request, res: Response, next: NextFunction) {
    console.log(e);
    res.status(e.statusCode).json({ message: e.message });
  }
}
