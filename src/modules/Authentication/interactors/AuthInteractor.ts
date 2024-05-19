import { inject, injectable } from "inversify";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { ICrypt } from "../interfaces/ICrypt";
import { IToken } from "../interfaces/IToken";
import UserDataDTO from "../DTOs/RegisterUserDTO";
import createError from "http-errors";
import { INTERFACE_TYPE } from "../../../config/DI";
import User from "../entities/User";
import CreateUserDTO from "../DTOs/CreateUserDTO";

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
  async getUserName(id: number): Promise<string | undefined> {
    return await this.repository.getUserName(id);
  }
  refreshToken(token: string): string {
    return this.token.refresh(token);
  }
  async registerUser(user: UserDataDTO): Promise<User> {
    try {
      const { plainTextPassword, ...userData } = user;
      const hashedPassword = await this.crypt.hash(plainTextPassword, 10);
      const registerUser = { ...userData, hashedPassword } as CreateUserDTO;
      const createdUser = await this.repository.registerUser(registerUser);
      const { accessToken, refreshToken } = this.token.sign(createdUser);
      const authenticatedUser = { ...createdUser, accessToken, refreshToken } as User;
      return authenticatedUser;
    } catch (e) {
      throw e;
    }
  }
  async authenticateUser(email: string, plainTextPassword: string): Promise<User> {
    try {
      const { hashedPassword, ...dbUser } = await this.repository.getUserByEmail(email);
      if (!dbUser) throw createError(401, "Wrong Credentials");

      const validation = await this.crypt.compare(plainTextPassword, hashedPassword);
      if (!validation) throw createError(401, "Wrong Credentials");
      const { accessToken, refreshToken } = this.token.sign(dbUser);
      const authenticateUser = { ...dbUser, accessToken, refreshToken };
      return authenticateUser;
    } catch (e) {
      throw e;
    }
  }
}
