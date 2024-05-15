export default interface AuthenticatedUserDTO {
  email: String;
  createdAt: Date;
  name: String;
  address: String;
  role: String;
  token: String;
}
