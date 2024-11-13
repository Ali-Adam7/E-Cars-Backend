import app from "./app";
import "reflect-metadata";
const PORT = 80;

app.listen(PORT, () => console.log("Listening to: ", PORT));
