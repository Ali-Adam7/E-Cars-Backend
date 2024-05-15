import { injectable } from "inversify";
import { IToken } from "../interfaces/IToken";
const jwt = require("jsonwebtoken");
@injectable()
export class Token implements IToken {
  async sign(data: any, privateKey: string, algorithm: string): Promise<string> {
    return await jwt.sign(data, privateKey, { algorithm: algorithm });
  }
}
