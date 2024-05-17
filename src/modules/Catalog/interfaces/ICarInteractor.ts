import { CarFiltersDTO } from "../DTOs/CarFiltersDTO";
import Car from "../entities/Car";
import Review from "../entities/Review";

export interface ICarInteractor {
  getFilteredCars(filters: CarFiltersDTO): Promise<{ cars: Car[]; numberOfPages: number }>;
  getCarById(id: number): Promise<Car | null>;
  purchaseCar(id: number, quantity: number): Promise<Car | null>;
  addCar(car: Omit<Car, "reviews">): Promise<Car | null>;
  modifyCar(id: number, car: Omit<Partial<Car | null>, "id" | "reviews">): Promise<Car | null>;
  deleteCar(id: number): Promise<Car | null>;
  getCarsOnSale(): Promise<Car[] | null>;
  getCarMakes(): Promise<string[]>;
  postReview(review: Review): Promise<Review | null>;
}
