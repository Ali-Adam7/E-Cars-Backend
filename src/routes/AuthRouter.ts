import express from "express";
import { Container } from "inversify";
import { INTERFACE_TYPE } from "../utils/types";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { AuthInteractor } from "../interactors/AuthInteractor";
import { AuthPrismaRepository } from "../repositories/AuthPrismaRepository";
import { AuthController } from "../controllers/AuthController";
import { IToken } from "../interfaces/IToken";
import { Token } from "../lib/token";
import { ICrypt } from "../interfaces/ICrypt";
import { Crypt } from "../lib/crypt";

const container = new Container();

container.bind<IAuthRepository>(INTERFACE_TYPE.AuthRepository).to(AuthPrismaRepository);
container.bind<IAuthInteractor>(INTERFACE_TYPE.AuthInteractor).to(AuthInteractor);
container.bind<IToken>(INTERFACE_TYPE.Token).to(Token);
container.bind<ICrypt>(INTERFACE_TYPE.Crypt).to(Crypt);
container.bind(INTERFACE_TYPE.AuthController).to(AuthController);

const router = express.Router();

const controller = container.get<AuthController>(INTERFACE_TYPE.AuthController);

router.post("/auth/", controller.onRegisterUser.bind(controller));
router.put("/auth/", controller.onAuthenticateUser.bind(controller));

export default router;
