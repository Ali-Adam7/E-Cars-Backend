import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import CarRouter from "./routers/CarRouter";
import AuthRouter from "./routers/AuthRouter";
import { middleware } from "./DIContainer";
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use("/catalog", CarRouter);
app.use("/auth", AuthRouter);
app.use(middleware.onError);
export default app;
