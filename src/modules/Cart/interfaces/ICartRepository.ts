import { PurchaseOrderItem } from "@prisma/client";
import CreatePurchaseOrderDTO from "../DTOs/CreatePurchaseOrderDTO";
import CartItem from "../entities/CartItem";
import PurchaseOrder from "../entities/PurchaseOrder";

export interface ICartRepository {
  getCartById(id: number): Promise<CartItem[]>;
  addCar(userId: number, carId: number, quantity: number): Promise<CartItem>;
  deleteCart(userId: number): Promise<void>;
  submitOrder(PurchaseOrder: PurchaseOrder): Promise<PurchaseOrder>;
  createOrder(userId: CreatePurchaseOrderDTO): Promise<PurchaseOrder>;
  createOrderItem(orderItem: PurchaseOrderItem): Promise<PurchaseOrderItem>;

  getPastOrders(userId: number): Promise<PurchaseOrder[]>;
}
