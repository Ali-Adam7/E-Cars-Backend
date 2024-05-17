import express from "express";
import { Container } from "inversify";
import { INTERFACE_TYPE } from "../config/DI";
import { Middleware } from "../middlewares/Middleware";
import { AuthController } from "../modules/Authentication/controller/AuthController";
import { AuthInteractor } from "../modules/Authentication/interactors/AuthInteractor";
import { IAuthInteractor } from "../modules/Authentication/interfaces/IAuthInteractor";
import { IAuthRepository } from "../modules/Authentication/interfaces/IAuthRepository";
import { ICrypt } from "../modules/Authentication/interfaces/ICrypt";
import { IToken } from "../modules/Authentication/interfaces/IToken";
import { AuthPrismaRepository } from "../modules/Authentication/repositories/AuthPrismaRepository";
import { Crypt } from "../third-party/crypt";
import { Token } from "../third-party/token";


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
