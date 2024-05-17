import express from "express";
import { Container } from "inversify";
import { INTERFACE_TYPE } from "../config/DI";
import { Middleware } from "../middlewares/Middleware";
import { ICrypt } from "../modules/Authentication/interfaces/ICrypt";
import { IToken } from "../modules/Authentication/interfaces/IToken";
import { CarController } from "../modules/Catalog/controller/CarController";
import { CarInteractor } from "../modules/Catalog/interactors/CarInteractor";
import { ICarInteractor } from "../modules/Catalog/interfaces/ICarInteractor";
import { ICarRepository } from "../modules/Catalog/interfaces/ICarRepository";
import { CarPrismaRepository } from "../modules/Catalog/repositories/CarPrismaRepository";
import { Crypt } from "../third-party/crypt";
import { Token } from "../third-party/token";

const container = new Container();
container.bind<ICarRepository>(INTERFACE_TYPE.CarRepository).to(CarPrismaRepository);
container.bind<ICarInteractor>(INTERFACE_TYPE.CarInteractor).to(CarInteractor);
container.bind(INTERFACE_TYPE.CarController).to(CarController);
container.bind(INTERFACE_TYPE.Middleware).to(Middleware);
container.bind<IToken>(INTERFACE_TYPE.Token).to(Token);
container.bind<ICrypt>(INTERFACE_TYPE.Crypt).to(Crypt);
const controller = container.get<CarController>(INTERFACE_TYPE.CarController);
const middleware = container.get<Middleware>(INTERFACE_TYPE.Middleware);

const router = express.Router();
router.get("/car/:id", controller.onGetCarById.bind(controller));
router.get("/makes", controller.onGetCarMakes.bind(controller));
router.post("/review", controller.onPostReview.bind(controller));
router.use("/car/admin/", middleware.isAdmin.bind(middleware));

router.use(controller.onError.bind(controller));

export default router;
