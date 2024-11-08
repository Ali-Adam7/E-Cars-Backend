import express from "express";
import { INTERFACE_TYPE } from "../config/DI";
import { container, middleware } from "../DIContainer";
import { CartController } from "../controllers/CartController";
const router = express.Router();
const controller = container.get<CartController>(INTERFACE_TYPE.CartController);
const authenticateUser = middleware.authenticateUser.bind(middleware);
router.use(authenticateUser);
const isAuthorized = middleware.isAuthorized.bind(middleware);
router.get(
  "/cart/:userId",
  isAuthorized,
  middleware.isAuthorized.bind(middleware),
  controller.onGetCartById.bind(controller)
);
router.delete("/cart/:userId/:carId", isAuthorized, controller.onDeleteCar.bind(controller));
router.delete("/cart/:userId", isAuthorized, controller.onDeleteCart.bind(controller));
router.post("/cart/:userId/:carId", isAuthorized, controller.onAddCar.bind(controller));
router.get("/orders/:userId", isAuthorized, controller.onGetPastOrders.bind(controller));
router.post("/purchase/:userId", controller.onSubmitOrder.bind(controller));

export default router;
