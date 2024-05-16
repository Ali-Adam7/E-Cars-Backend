export default interface User {
  id: number;
  email: string;
  hashedPassword: string;
  createdAt: Date;
  name: string;
  address: string;
  role: string;
}
