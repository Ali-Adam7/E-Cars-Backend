import CarDataDTO from "../DTOs/CarDataDTO";
import CarFiltersDTO from "../DTOs/CarFiltersDTO";
import Car from "../entities/Car";
import Review from "../entities/Review";

export interface ICarRepository {
  getCarById(id: number): Promise<Car>;
  getFilteredCars(filters: CarFiltersDTO): Promise<{ cars: Car[]; numberOfPages: number }>;
  addCar(car: CarDataDTO): Promise<Car>;
  modifyCar(id: number, car: Omit<Partial<Car>, "id" | "reviews">): Promise<Car>;
  deleteCar(id: number): Promise<Car>;
  purchaseCar(id: number, quantity: number): Promise<Car>;
  getCarsOnSale(): Promise<Car[]>;
  getCarMakes(): Promise<string[]>;
  postReview(review: Review): Promise<Review>;
}
