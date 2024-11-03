import { injectable, inject } from "inversify";
import { ICartRepository } from "../interfaces/ICartRepository";
import { ICartInteractor } from "../interfaces/ICartInteractor";
import createError from "http-errors";
import CartItem from "../entities/CartItem";
import PurchaseOrder from "../entities/PurchaseOrder";
import { INTERFACE_TYPE } from "../config/DI";
import { PurchaseCarEmitter } from "../events/PurchaseCarEmitter";

@injectable()
export class CartInteractor implements ICartInteractor {
  private repository: ICartRepository;
  private purchaseCarEmitter: PurchaseCarEmitter;

  constructor(
    @inject(INTERFACE_TYPE.CartRepository) repository: ICartRepository,
    @inject(INTERFACE_TYPE.PurchaseCarEmitter) purchaseCarEmitter: PurchaseCarEmitter
  ) {
    this.repository = repository;
    this.purchaseCarEmitter = purchaseCarEmitter;
  }
  async getCartById(userId: number): Promise<CartItem[]> {
    try {
      const cart = await this.repository.getCartById(userId);
      const customerCart = cart.map((item) => {
        return { ...item.car, quantity: item.quantity };
      }) as any;
      return customerCart;
    } catch (e) {
      throw e;
    }
  }
  async addCar(userId: number, carId: number, quantity: number): Promise<CartItem> {
    try {
      return await this.repository.addCar(userId, carId, quantity);
    } catch (e) {
      throw e;
    }
  }
  async deleteCar(userId: number, carId: number): Promise<void> {
    try {
      await this.repository.deleteCar(userId, carId);
    } catch (e) {
      throw e;
    }
  }
  async deleteCart(userId: number): Promise<void> {
    try {
      await this.repository.deleteCart(userId);
    } catch (e) {
      throw e;
    }
  }

  async submitOrder(userId: number): Promise<PurchaseOrder> {
    try {
      // get cart
      const cart: CartItem[] = await this.repository.getCartById(userId);

      // check  quantity for each item

      cart.forEach((cartItem: CartItem) => {
        const { quantity, car } = cartItem;
        if (car.quantity < quantity) throw createError(200, "Out of stock");
      });

      const purchaseOrder = await this.repository.createOrder({ userId: userId, status: "PROCESSING" });
      for (const cartItem of cart) {
        const { quantity, car } = cartItem;
        this.purchaseCarEmitter.emit("Purchase", { carId: car.id, quantity: quantity });

        const item = {
          purchaseOrderId: purchaseOrder.purchaseOrderId,
          carId: car.id,
          price: car.price,
          quantity: quantity,
        };
        await this.repository.createOrderItem(item);
      }
      purchaseOrder.status = "SHIPED";
      const submittedOrder = await this.repository.submitOrder(purchaseOrder);
      return submittedOrder;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getPastOrders(userId: number): Promise<PurchaseOrder[]> {
    try {
      const orders = await this.repository.getPastOrders(userId);
      return orders;
    } catch (e) {
      throw e;
    }
  }
}
