import express from "express";
import { INTERFACE_TYPE } from "../config/DI";

import { CarController } from "../controllers/CarController";
import { Container } from "inversify";
import { CarInteractor } from "../interactors/CarInteractor";
import { ICarInteractor } from "../interfaces/Catalog/ICarInteractor";
import { ICarRepository } from "../interfaces/Catalog/ICarRepository";
import { CarPrismaRepository } from "../repositories/CarPrismaRepository";
import { Middleware } from "../middlewares/Middleware";
import { Crypt } from "../external_services/crypt";
import { Token } from "../external_services/token";
import { ICrypt } from "../interfaces/Authentication/ICrypt";
import { IToken } from "../interfaces/Authentication/IToken";

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
