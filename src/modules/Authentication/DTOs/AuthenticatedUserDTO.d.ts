export default interface AuthenticatedUserDTO {
  email: string;
  createdAt: Date;
  name: string;
  address: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  iat?: number;
  exp?: number;
  hashedPassword: string;
}
