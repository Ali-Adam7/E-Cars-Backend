import { inject, injectable } from "inversify";
import EventEmitter from "node:events";
import { INTERFACE_TYPE } from "../config/DI";
import { ICarInteractor } from "../interfaces/ICarInteractor";

@injectable()
export class PurchaseCarEmitter extends EventEmitter {
  private carInteractor: ICarInteractor;
  constructor(@inject(INTERFACE_TYPE.CarInteractor) carInteractor: ICarInteractor) {
    super();
    this.carInteractor = carInteractor;
    this.attachListener();
  }
  emitPurchase = (carId: number, quantity: number) => {
    this.emit("Purchase", { carId: carId, quantity: quantity });
  };
  private attachListener = () => {
    this.on("Purchase", async ({ carId, quantity }) => {
      await this.carInteractor.purchaseCar(carId, quantity);
    });
  };
}
