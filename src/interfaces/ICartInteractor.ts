import CartItem from "../entities/CartItem";
import PurchaseOrder from "../entities/PurchaseOrder";

export interface ICartInteractor {
  getCartById(userId: number): Promise<CartItem[]>;
  addCar(userId: number, carId: number, quantity: number): Promise<CartItem>;
  deleteCart(userId: number): Promise<void>;
  deleteCar(userId: number, carId: number): Promise<void>;
  submitOrder(userId: number): Promise<PurchaseOrder>;
  getPastOrders(userId: number): Promise<PurchaseOrder[]>;
}
