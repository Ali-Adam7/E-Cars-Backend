import express from "express";
import { INTERFACE_TYPE } from "../config/DI";
import { AuthController } from "../modules/Authentication/controller/AuthController";
import { container } from "../DIContainer";

const router = express.Router();
const controller = container.get<AuthController>(INTERFACE_TYPE.AuthController);

router.post("/auth/", controller.onRegisterUser.bind(controller));
router.put("/auth/", controller.onAuthenticateUser.bind(controller));
router.put("/auth/refresh", controller.onRefreshToken.bind(controller));
router.use(controller.onError.bind(controller));

export default router;
