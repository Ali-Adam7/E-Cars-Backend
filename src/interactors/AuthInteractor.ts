import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/types";
import { IAuthInteractor } from "../interfaces/IAuthInteractor";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import UserDataDTO from "../interfaces/DTOs/Authentication/UserDataDTO";
import AuthenticatedUserDTO from "../interfaces/DTOs/Authentication/AuthenticatedUserDTO";
import RegisterUserDTO from "../interfaces/DTOs/Authentication/RegisterUserDTO";
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
  refreshToken(token: string): string | null {
    return this.token.refresh(token);
  }
  async registerUser(user: UserDataDTO): Promise<AuthenticatedUserDTO> {
    const { plainTextPassword, ...userData } = user;
    const hashedPassword = await this.crypt.hash(plainTextPassword, 10);
    const registerUser = { ...userData, hashedPassword } as RegisterUserDTO;
    const createdUser = await this.repository.registerUser(registerUser);
    const { accessToken, refreshToken } = this.token.sign(createdUser);
    const authenticateUser = { ...createdUser, accessToken, refreshToken };
    return authenticateUser;
  }
  async authenticateUser(email: string, plainTextPassword: string): Promise<AuthenticatedUserDTO | null> {
    try {
      const dbUser = await this.repository.getUserByEmail(email);
      if (!dbUser) return null;
      const validation = await this.crypt.compare(plainTextPassword, dbUser.hashedPassword);
      if (!validation) return null;
      const { accessToken, refreshToken } = this.token.sign(dbUser);
      const authenticateUser = { ...dbUser, accessToken, refreshToken };
      return authenticateUser;
    } catch (error: any) {
      return null;
    }
  }
}
