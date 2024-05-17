import { Container } from "inversify";
import { INTERFACE_TYPE } from "./config/DI";
import { Middleware } from "./middlewares/Middleware";
import { AuthController } from "./modules/Authentication/controller/AuthController";
import { AuthInteractor } from "./modules/Authentication/interactors/AuthInteractor";
import { IAuthInteractor } from "./modules/Authentication/interfaces/IAuthInteractor";
import { IAuthRepository } from "./modules/Authentication/interfaces/IAuthRepository";
import { ICrypt } from "./modules/Authentication/interfaces/ICrypt";
import { IToken } from "./modules/Authentication/interfaces/IToken";
import { AuthPrismaRepository } from "./modules/Authentication/repositories/AuthPrismaRepository";
import { Crypt } from "./third-party/crypt";
import { Token } from "./third-party/token";
import { ICarRepository } from "./modules/Catalog/interfaces/ICarRepository";
import { CarController } from "./modules/Catalog/controller/CarController";
import { CarInteractor } from "./modules/Catalog/interactors/CarInteractor";
import { ICarInteractor } from "./modules/Catalog/interfaces/ICarInteractor";
import { CarPrismaRepository } from "./modules/Catalog/repositories/CarPrismaRepository";

export const container = new Container();

container.bind<IAuthRepository>(INTERFACE_TYPE.AuthRepository).to(AuthPrismaRepository);
container.bind<IAuthInteractor>(INTERFACE_TYPE.AuthInteractor).to(AuthInteractor);
container.bind(INTERFACE_TYPE.AuthController).to(AuthController);
container.bind<IToken>(INTERFACE_TYPE.Token).to(Token);
container.bind<ICrypt>(INTERFACE_TYPE.Crypt).to(Crypt);

container.bind<ICarRepository>(INTERFACE_TYPE.CarRepository).to(CarPrismaRepository);
container.bind<ICarInteractor>(INTERFACE_TYPE.CarInteractor).to(CarInteractor);
container.bind(INTERFACE_TYPE.CarController).to(CarController);

container.bind(INTERFACE_TYPE.Middleware).to(Middleware);
export const middleware = container.get<Middleware>(INTERFACE_TYPE.Middleware);
