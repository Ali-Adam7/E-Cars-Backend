import fs from "fs";
import path from "path";

export const accessTokenKey = fs.readFileSync(path.resolve(__dirname, "../security/accessTokenKey.pem"), "utf8");
export const refreshTokenKey = fs.readFileSync(path.resolve(__dirname, "../security/refreshTokenSecret.pem"), "utf8");
