import fs from "fs";
import path from "path";

export const privateKey = fs.readFileSync(path.resolve(__dirname, "../certificates/key.pem"), "utf8");
