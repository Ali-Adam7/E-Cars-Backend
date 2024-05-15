import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/types";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { privateKey } from "../utils/config";
import UserDataDTO from "../interfaces/DTOs/UserDataDTO";
import AuthenticatedUserDTO from "../interfaces/DTOs/AuthenticatedUserDTO";
import RegisterUserDTO from "../interfaces/DTOs/RegisterUserDTO";
import { IToken } from "../interfaces/IToken";
import { ICrypt } from "../interfaces/ICrypt";

@injectable()
export class AuthInteractor implements IAuthInteractor {
  private repository: IAuthRepository;
  private token: IToken;
  private crypt: ICrypt;
  constructor(
    @inject(INTERFACE_TYPE.AuthRepository) repository: IAuthRepository,
    @inject(INTERFACE_TYPE.Token) token: IToken,
    @inject(INTERFACE_TYPE.Crypt) crypt: ICrypt
  ) {
    this.repository = repository;
    this.token = token;
    this.crypt = crypt;
  }
  async registerUser(user: UserDataDTO): Promise<AuthenticatedUserDTO> {
    const { plainTextPassword, ...userData } = user;
    const hashedPassword = (await this.crypt.hash(plainTextPassword, 10)) as String;
    const registerUser = { ...userData, hashedPassword } as RegisterUserDTO;
    const createdUser = await this.repository.registerUser(registerUser);
    const token = await this.token.sign(createdUser, privateKey, "RS256");
    const authenticateUser = { ...createdUser, token } as AuthenticatedUserDTO;
    return authenticateUser;
  }
  async authenticateUser(email: string, plainTextPassword: string): Promise<AuthenticatedUserDTO | null> {
    try {
      const dbUser = await this.repository.getUserByEmail(email);
      if (!dbUser) return null;
      const validation = await this.crypt.compare(plainTextPassword, dbUser.hashedPassword);
      if (!validation) return null;
      const token = (await this.token.sign(dbUser, privateKey, "RS256")) as string;
      const authenticateUser = { ...dbUser, token } as AuthenticatedUserDTO;
      return authenticateUser;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }
}
