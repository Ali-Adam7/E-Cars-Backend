export default interface User {
  id: number;
  email: string;
  createdAt: Date;
  name: string;
  address: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}
