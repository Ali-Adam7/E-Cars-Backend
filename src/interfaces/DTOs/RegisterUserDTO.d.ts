export default interface RegisterUserDTO {
  email: string;
  hashedPassword: string;
  createdAt: Date;
  name: string;
  address: string;
  role: string;
}
