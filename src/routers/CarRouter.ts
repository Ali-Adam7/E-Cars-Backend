import express from "express";
import { INTERFACE_TYPE } from "../config/DI";
import { CarController } from "../modules/Catalog/controller/CarController";
import { container } from "../DIContainer";

const router = express.Router();
const controller = container.get<CarController>(INTERFACE_TYPE.CarController);
router.get("/makes", controller.onGetCarMakes.bind(controller));
router.get("/cars/", controller.onGetCarsByFilter.bind(controller));
router.post("/car/", controller.onAddCar.bind(controller));
router.get("/car/:id", controller.onGetCarById.bind(controller));
router.put("/car/:id", controller.onModifyCar.bind(controller));
router.delete("/car/:id", controller.onDeleteCar.bind(controller));
router.post("/review", controller.onPostReview.bind(controller));

export default router;
