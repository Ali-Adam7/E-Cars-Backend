import CarDataDTO from "../DTOs/CarDataDTO";
import CarFiltersDTO from "../DTOs/CarFiltersDTO";
import CarModificationDTO from "../DTOs/CarModificationDTO";
import Car from "../entities/Car";
import Review from "../entities/Review";

export interface ICarInteractor {
  getFilteredCars(filters: CarFiltersDTO): Promise<Car[]>;
  getCarById(id: number): Promise<Car>;
  purchaseCar(id: number, quantity: number): Promise<Car>;
  addCar(car: CarDataDTO): Promise<Car>;
  modifyCar(id: number, car: CarModificationDTO): Promise<Car | null>;
  deleteCar(id: number): Promise<Car | null>;
  getCarMakes(): Promise<string[]>;
  postReview(review: Review): Promise<Review>;
}
