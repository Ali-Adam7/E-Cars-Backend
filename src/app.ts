import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import CarRouter from "./routers/CarRouter";
import AuthRouter from "./routers/AuthRouter";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(CarRouter);
app.use(AuthRouter);

export default app;