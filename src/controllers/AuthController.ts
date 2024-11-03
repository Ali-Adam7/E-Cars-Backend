import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import UserDataDTO from "../DTOs/RegisterUserDTO";
import RequestAuthDTO from "../DTOs/LoginUserDTO";
import { INTERFACE_TYPE } from "../config/DI";

@injectable()
export class AuthController {
  private interactor: IAuthInteractor;

  constructor(@inject(INTERFACE_TYPE.AuthInteractor) interactor: IAuthInteractor) {
    this.interactor = interactor;
  }

  async onRegisterUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body as UserDataDTO;
      const { accessToken, refreshToken, ...data } = await this.interactor.registerUser(userData);
      res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict" });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });
      return res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }
  async onAuthenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, plainTextPassword } = req.body as RequestAuthDTO;
      if (!email || !plainTextPassword) return res.sendStatus(400);
      const authenticateUser = await this.interactor.authenticateUser(email, plainTextPassword);
      if (!authenticateUser) return;
      const { accessToken, refreshToken, ...data } = authenticateUser;
      res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict" });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onRefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const accessToken = this.interactor.refreshToken(refreshToken);
      return res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict" }).sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async onDeleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      return res.sendStatus(500);
    } catch (error) {
      next(error);
    }
  }
}
