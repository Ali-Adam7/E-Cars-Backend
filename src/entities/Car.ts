import Review from "./Review";

export default interface Car {
  id: number;
  model: string;
  make: string;
  description: string;
  type: string;
  price: number;
  year: number;
  milage: number;
  quantity: number;
  reviews?: Review[];
}
