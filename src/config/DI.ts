export const INTERFACE_TYPE = {
  AuthRepository: Symbol.for("AuthRepository"),
  AuthInteractor: Symbol.for("AuthInteractor"),
  AuthController: Symbol.for("AuthController"),

  CarRepository: Symbol.for("CarRepository"),
  CarInteractor: Symbol.for("CarInteractor"),
  CarController: Symbol.for("CarController"),

  Middleware: Symbol.for("Middleware"),
  Token: Symbol.for("Token"),
  Crypt: Symbol.for("Crypt"),
};
