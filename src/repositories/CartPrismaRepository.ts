import { injectable } from "inversify";
import { ICartRepository } from "../interfaces/ICartRepository";
import CartItem from "../entities/CartItem";
import CreateOrderDTO from "../DTOs/CreatePurchaseOrderDTO";
import PurchaseOrder from "../entities/PurchaseOrder";
import PurchaseOrderOrderItem from "../entities/PurchaseOrderItem";
import PurchaseOrderItem from "../entities/PurchaseOrderItem";
import prisma from "../third-party/prisma/prismClient";

@injectable()
export class CartPrismaRepository implements ICartRepository {
  async getCartById(userId: number): Promise<CartItem[]> {
    try {
      return await prisma.cartItem.findMany({ where: { userId }, include: { car: true } });
    } catch (e) {
      throw e;
    }
  }
  async addCar(userId: number, carId: number, quantity: number): Promise<CartItem> {
    try {
      return await prisma.cartItem.upsert({
        where: { userId_carId: { userId, carId } },
        create: { quantity, User: { connect: { id: userId } }, car: { connect: { id: carId } } },
        update: {
          quantity: { increment: quantity },
          User: { connect: { id: userId } },
          car: { connect: { id: carId } },
        },
        include: { car: true },
      });
    } catch (e) {
      throw e;
    }
  }
  async deleteCart(userId: number): Promise<void> {
    try {
      await prisma.cartItem.deleteMany({ where: { userId } });
    } catch (e) {
      throw e;
    }
  }
  async deleteCar(userId: number, carId: number): Promise<void> {
    try {
      const inventoryItem = await prisma.cartItem.findUnique({
        where: { userId_carId: { userId, carId } },
      });
      if (!inventoryItem) return;
      if (inventoryItem.quantity > 1)
        await prisma.cartItem.update({
          where: { userId_carId: { userId, carId } },
          data: { quantity: inventoryItem.quantity - 1 },
        });
      else await prisma.cartItem.delete({ where: { userId_carId: { userId, carId } } });
    } catch (e) {
      throw e;
    }
  }

  async createOrder(order: CreateOrderDTO): Promise<PurchaseOrder> {
    return await prisma.purchaseOrder.create({ data: order, include: { items: true } });
  }
  async createOrderItem(orderItem: PurchaseOrderItem): Promise<PurchaseOrderOrderItem> {
    return await prisma.purchaseOrderItem.create({ data: orderItem });
  }
  async submitOrder(order: PurchaseOrder): Promise<PurchaseOrder> {
    const { items, ...orderData } = order;
    const purchaseOrder = await prisma.purchaseOrder.update({
      where: { purchaseOrderId: orderData.purchaseOrderId },
      data: orderData,
      include: { items: true },
    });
    await prisma.cartItem.deleteMany({ where: { userId: orderData.userId } });
    return purchaseOrder;
  }
  async getPastOrders(userId: number): Promise<PurchaseOrder[]> {
    try {
      return await prisma.purchaseOrder.findMany({ where: { userId }, include: { items: true } });
    } catch (e) {
      throw e;
    }
  }
}
