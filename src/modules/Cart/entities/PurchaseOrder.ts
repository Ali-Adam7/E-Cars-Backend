import OrderItem from "./PurchaseOrderItem";

export default interface PurchaseOrder {
  purchaseOrderId: number;
  userId: number;
  status: string;
  total: number | null;
  items: OrderItem[];
}
