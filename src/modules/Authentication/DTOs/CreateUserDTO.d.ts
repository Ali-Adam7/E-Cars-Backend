export default interface CreateUserDTO {
  email: string;
  createdAt: Date;
  name: string;
  address: string;
  role: string;
  hashedPassword: string;
}
