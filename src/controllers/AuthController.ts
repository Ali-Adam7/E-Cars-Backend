import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/types";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import UserDataDTO from "../interfaces/DTOs/UserDataDTO";

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
      const { email, plainTextPassword } = req.body;
      const authenticateUser = await this.interactor.authenticateUser(email, plainTextPassword);
      return res.status(200).json(authenticateUser);
    } catch (error) {
      next(error);
    }
  }
}
