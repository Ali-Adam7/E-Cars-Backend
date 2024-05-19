import fs from "fs";
import path from "path";

export const accessTokenKey = fs.readFileSync(path.resolve(__dirname, "../keys/accessTokenKey.pem"), "utf8");
export const refreshTokenKey = fs.readFileSync(path.resolve(__dirname, "../keys/refreshTokenSecret.pem"), "utf8");
