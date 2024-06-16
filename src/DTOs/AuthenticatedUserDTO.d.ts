import DBUserDTO from "./DBUserDTO";

export default interface AuthenticatedUserDTO extends DBUserDTO {
  iat?: number;
  exp?: number;
}
