import Car from "../../Catalog/entities/Car";

export default interface CartItem {
  userId: number;
  quantity: number;
  carId: number;
  car: Car;
}
