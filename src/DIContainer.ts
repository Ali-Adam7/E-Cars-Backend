import { Container } from "inversify";
import { INTERFACE_TYPE } from "./config/DI";
import { AuthController } from "./controllers/AuthController";
import { CarController } from "./controllers/CarController";
import { CartController } from "./controllers/CartController";
import { AuthInteractor } from "./interactors/AuthInteractor";
import { CarInteractor } from "./interactors/CarInteractor";
import { CartInteractor } from "./interactors/CartInteractor";
import { IAuthInteractor } from "./interfaces/IAuthInteractor";
import { IAuthRepository } from "./interfaces/IAuthRepository";
import { ICarInteractor } from "./interfaces/ICarInteractor";
import { ICarRepository } from "./interfaces/ICarRepository";
import { ICartInteractor } from "./interfaces/ICartInteractor";
import { ICartRepository } from "./interfaces/ICartRepository";
import { ICrypt } from "./interfaces/ICrypt";
import { IToken } from "./interfaces/IToken";
import { Middleware } from "./middlewares/Middleware";
import { AuthPrismaRepository } from "./repositories/AuthPrismaRepository";
import { CarPrismaRepository } from "./repositories/CarPrismaRepository";
import { CartPrismaRepository } from "./repositories/CartPrismaRepository";
import { Crypt } from "./third-party/crypt";
import { Token } from "./third-party/token";
import { PurchaseCarEmitter } from "./events/PurchaseCarEmitter";
import "reflect-metadata";

export const container = new Container({ autoBindInjectable: true });
container.options.skipBaseClassChecks = true;

container.bind<IToken>(INTERFACE_TYPE.Token).to(Token);
container.bind<ICrypt>(INTERFACE_TYPE.Crypt).to(Crypt);

container.bind<IAuthRepository>(INTERFACE_TYPE.AuthRepository).to(AuthPrismaRepository);
container.bind<IAuthInteractor>(INTERFACE_TYPE.AuthInteractor).to(AuthInteractor);
container.bind(INTERFACE_TYPE.AuthController).to(AuthController);

container.bind<ICarRepository>(INTERFACE_TYPE.CarRepository).to(CarPrismaRepository);
container.bind<ICarInteractor>(INTERFACE_TYPE.CarInteractor).to(CarInteractor);
container.bind(INTERFACE_TYPE.CarController).to(CarController);

container.bind<ICartRepository>(INTERFACE_TYPE.CartRepository).to(CartPrismaRepository);
container.bind<ICartInteractor>(INTERFACE_TYPE.CartInteractor).to(CartInteractor);
container.bind(INTERFACE_TYPE.CartController).to(CartController);

container.bind(INTERFACE_TYPE.Middleware).to(Middleware);
container.bind(INTERFACE_TYPE.PurchaseCarEmitter).to(PurchaseCarEmitter);

export const middleware = container.get<Middleware>(INTERFACE_TYPE.Middleware);
