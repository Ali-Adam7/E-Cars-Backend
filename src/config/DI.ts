export const INTERFACE_TYPE = {
  Token: Symbol.for("Token"),
  Crypt: Symbol.for("Crypt"),

  AuthRepository: Symbol.for("AuthRepository"),
  AuthInteractor: Symbol.for("AuthInteractor"),
  AuthController: Symbol.for("AuthController"),

  CarRepository: Symbol.for("CarRepository"),
  CarInteractor: Symbol.for("CarInteractor"),
  CarController: Symbol.for("CarController"),

  CartRepository: Symbol.for("CartRepository"),
  CartInteractor: Symbol.for("CartInteractor"),
  CartController: Symbol.for("CartController"),

  Middleware: Symbol.for("Middleware"),
  PurchaseCarEmitter: Symbol.for("PurchaseEmitter"),
};
