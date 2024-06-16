import Car from "./Car";

export default interface CartItem {
  userId: number;
  quantity: number;
  carId: number;
  car: Car;
}
