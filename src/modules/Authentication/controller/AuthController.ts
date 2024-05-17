import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import UserDataDTO from "../DTOs/UserDataDTO";
import RequestAuthDTO from "../DTOs/RequestAuthDTO";
import { HttpError } from "http-errors";
import { INTERFACE_TYPE } from "../../../config/DI";

@injectable()
export class AuthController {
  private interactor: IAuthInteractor;

  constructor(@inject(INTERFACE_TYPE.AuthInteractor) interactor: IAuthInteractor) {
    this.interactor = interactor;
  }

  async onRegisterUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body as UserDataDTO;
      const AuthenticatedUser = await this.interactor.registerUser(userData);
      return res.status(200).json(AuthenticatedUser);
    } catch (error) {
      next(error);
    }
  }
  async onAuthenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, plainTextPassword } = req.body as RequestAuthDTO;
      const authenticateUser = await this.interactor.authenticateUser(email, plainTextPassword);
      return res.status(200).json(authenticateUser);
    } catch (error) {
      next(error);
    }
  }

  async onRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const accessToken = this.interactor.refreshToken(refreshToken);
      return res.status(200).json(accessToken);
    } catch (error) {
      next(error);
    }
  }

  onError(e: HttpError, req: Request, res: Response, next: NextFunction) {
    console.error(e);
    res.status(e.statusCode).json({ message: e.message });
  }
}
