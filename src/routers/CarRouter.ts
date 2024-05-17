import express from "express";
import { INTERFACE_TYPE } from "../config/DI";
import { CarController } from "../modules/Catalog/controller/CarController";
import { container } from "../DIContainer";

const controller = container.get<CarController>(INTERFACE_TYPE.CarController);

const router = express.Router();
router.get("/car/:id", controller.onGetCarById.bind(controller));
router.get("/makes", controller.onGetCarMakes.bind(controller));
router.post("/review", controller.onPostReview.bind(controller));

router.use(controller.onError.bind(controller));

export default router;
