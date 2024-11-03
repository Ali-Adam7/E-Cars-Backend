import express from "express";
import { INTERFACE_TYPE } from "../config/DI";
import { container, middleware } from "../DIContainer";
import { CarController } from "../controllers/CarController";

const router = express.Router();
const controller = container.get<CarController>(INTERFACE_TYPE.CarController);
const authenticateUser = middleware.authenticateUser.bind(middleware);
router.use(authenticateUser);
const isAdmin = middleware.isAdmin.bind(middleware);
router.get("/makes", controller.onGetCarMakes.bind(controller));
router.get("/cars/", controller.onGetCarsByFilter.bind(controller));
router.post("/car/", isAdmin, controller.onAddCar.bind(controller));
router.get("/car/:id", controller.onGetCarById.bind(controller));
router.put("/car/:id", isAdmin, controller.onModifyCar.bind(controller));
router.patch("/car/:id", controller.onPurchaseCar.bind(controller));
router.delete("/car/:id", isAdmin, controller.onDeleteCar.bind(controller));
router.post("/review", controller.onPostReview.bind(controller));

export default router;
