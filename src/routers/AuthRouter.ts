import express from "express";
import { INTERFACE_TYPE } from "../config/DI";
import { container } from "../DIContainer";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();
const controller = container.get<AuthController>(INTERFACE_TYPE.AuthController);
router.post("/", controller.onRegisterUser.bind(controller));
router.put("/", controller.onAuthenticateUser.bind(controller));
router.patch("/", controller.onRefreshToken.bind(controller));

export default router;
