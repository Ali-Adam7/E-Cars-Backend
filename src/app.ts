import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import CarRouter from "./routers/CarRouter";
import AuthRouter from "./routers/AuthRouter";

const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(CarRouter);
app.use(AuthRouter);

export default app;
