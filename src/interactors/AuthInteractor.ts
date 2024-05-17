import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../config/DI";
import { IAuthRepository } from "../interfaces/Authentication/IAuthRepository";
import AuthenticatedUserDTO from "../interfaces/Authentication/AuthenticatedUserDTO";
import { IAuthInteractor } from "../interfaces/Authentication/IAuthInteractor";
import { ICrypt } from "../interfaces/Authentication/ICrypt";
import { IToken } from "../interfaces/Authentication/IToken";
import RegisterUserDTO from "../interfaces/Authentication/RegisterUserDTO";
import UserDataDTO from "../interfaces/Authentication/UserDataDTO";
import createError from "http-errors";

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
  refreshToken(token: string): string | null {
    return this.token.refresh(token);
  }
  async registerUser(user: UserDataDTO): Promise<AuthenticatedUserDTO> {
    try {
      const { plainTextPassword, ...userData } = user;
      const hashedPassword = await this.crypt.hash(plainTextPassword, 10);
      const registerUser = { ...userData, hashedPassword } as RegisterUserDTO;
      const createdUser = await this.repository.registerUser(registerUser);
      const { accessToken, refreshToken } = this.token.sign(createdUser);
      const authenticateUser = { ...createdUser, accessToken, refreshToken };
      return authenticateUser;
    } catch (e) {
      throw e;
    }
  }
  async authenticateUser(email: string, plainTextPassword: string): Promise<AuthenticatedUserDTO | null> {
    try {
      const dbUser = await this.repository.getUserByEmail(email);
      if (!dbUser) throw createError(401, "Wrong Credentials");

      const validation = await this.crypt.compare(plainTextPassword, dbUser.hashedPassword);
      if (!validation) throw createError(401, "Wrong Credentials");
      const { accessToken, refreshToken } = this.token.sign(dbUser);
      const authenticateUser = { ...dbUser, accessToken, refreshToken };
      return authenticateUser;
    } catch (e) {
      throw e;
    }
  }
}
