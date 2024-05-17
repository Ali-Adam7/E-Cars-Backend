import Review from "./Review";

export default interface Car {
  id: number;
  model: string;
  make: string;
  description: string;
  type: string;
  price: number;
  img: string;
  year: number;
  history: boolean;
  milage: number;
  quantity: number;
  deal: boolean;
  reviews?: Review[];
}


