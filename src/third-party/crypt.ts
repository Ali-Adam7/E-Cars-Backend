import { injectable } from "inversify";
import { ICrypt } from "../modules/Authentication/interfaces/ICrypt";
const bcrypt = require("bcrypt");

@injectable()
export class Crypt implements ICrypt {
  async compare(plainTextPassword: string, hashedPassword: string): Promise<boolean | Error> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
  async hash(PlainTextpassword: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(PlainTextpassword, 10);
  }
}
