import app from "./app";
import "reflect-metadata";
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Listening to: ", PORT));
