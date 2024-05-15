import "reflect-metadata";
import express from "express";
import AuthRouter from "./routes/AuthRouter";

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());

app.use(AuthRouter);

app.listen(PORT, () => {
  console.log("Listening to: ", PORT);
});
