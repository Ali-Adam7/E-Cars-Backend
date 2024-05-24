import fs from "fs";
import path from "path";

const accessTokenKey = fs.readFileSync(path.resolve(__dirname, "../keys/accessTokenKey.pem"), "utf8");
const refreshTokenKey = fs.readFileSync(path.resolve(__dirname, "../keys/refreshTokenSecret.pem"), "utf8");

export { accessTokenKey, refreshTokenKey };
