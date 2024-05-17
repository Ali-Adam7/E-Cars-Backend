import express from "express";
import { INTERFACE_TYPE } from "../config/DI";

import { AuthController } from "../controllers/AuthController";

import { Container } from "inversify";
import { Crypt } from "../external_services/crypt";
import { Token } from "../external_services/token";
import { AuthInteractor } from "../interactors/AuthInteractor";
import { IAuthInteractor } from "../interfaces/Authentication/IAuthInteractor";
import { IAuthRepository } from "../interfaces/Authentication/IAuthRepository";
import { ICrypt } from "../interfaces/Authentication/ICrypt";
import { IToken } from "../interfaces/Authentication/IToken";
import { AuthPrismaRepository } from "../repositories/AuthPrismaRepository";
import { Middleware } from "../middlewares/Middleware";

const container = new Container();

container.bind<IAuthRepository>(INTERFACE_TYPE.AuthRepository).to(AuthPrismaRepository);
container.bind<IAuthInteractor>(INTERFACE_TYPE.AuthInteractor).to(AuthInteractor);
container.bind<IToken>(INTERFACE_TYPE.Token).to(Token);
container.bind<ICrypt>(INTERFACE_TYPE.Crypt).to(Crypt);
container.bind(INTERFACE_TYPE.AuthController).to(AuthController);
container.bind(INTERFACE_TYPE.Middleware).to(Middleware);
const middleware = container.get<Middleware>(INTERFACE_TYPE.Middleware);
const router = express.Router();
const controller = container.get<AuthController>(INTERFACE_TYPE.AuthController);

router.post("/auth/", controller.onRegisterUser.bind(controller));
router.put("/auth/", controller.onAuthenticateUser.bind(controller));
router.put("/auth/refresh", controller.onRefreshToken.bind(controller));
router.use(controller.onError.bind(controller));

export default router;
