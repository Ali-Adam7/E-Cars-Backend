import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../../config/DI";
import CarFiltersDTO from "../DTOs/CarFiltersDTO";
import { ICarInteractor } from "../interfaces/ICarInteractor";
import { ICarRepository } from "../interfaces/ICarRepository";
import Car from "../entities/Car";
import Review from "../entities/Review";
import CarDataDTO from "../DTOs/CarDataDTO";
import CarModificationDTO from "../DTOs/CarModificationDTO";
import createError from "http-errors";

@injectable()
export class CarInteractor implements ICarInteractor {
  private repository: ICarRepository;

  constructor(@inject(INTERFACE_TYPE.CarRepository) repository: ICarRepository) {
    this.repository = repository;
  }
  async getFilteredCars(filters: CarFiltersDTO): Promise<{ cars: Car[]; numberOfPages: number }> {
    try {
      return await this.repository.getFilteredCars(filters);
    } catch (e) {
      return { cars: [], numberOfPages: 0 };
    }
  }
  async getCarById(id: number): Promise<Car> {
    try {
      return await this.repository.getCarById(id);
    } catch (e) {
      throw e;
    }
  }
  async purchaseCar(id: number, quantity: number): Promise<Car> {
    try {
      const car = await this.getCarById(id);
      if (car?.quantity) return await this.repository.purchaseCar(id, quantity);
      else throw createError(200, "Out of stock");
    } catch (e) {
      throw e;
    }
  }
  async addCar(car: CarDataDTO): Promise<Car> {
    try {
      return await this.repository.addCar(car);
    } catch (e) {
      throw e;
    }
  }
  async modifyCar(id: number, car: CarModificationDTO): Promise<Car> {
    try {
      return await this.repository.modifyCar(id, car);
    } catch (e) {
      throw e;
    }
  }
  async deleteCar(id: number): Promise<Car> {
    try {
      return await this.repository.deleteCar(id);
    } catch (e) {
      throw e;
    }
  }
  async getCarsOnSale(): Promise<Car[]> {
    try {
      return await this.repository.getCarsOnSale();
    } catch (error) {
      return [];
    }
  }
  async getCarMakes(): Promise<string[]> {
    try {
      return await this.repository.getCarMakes();
    } catch (e) {
      return [];
    }
  }
  async postReview(review: Review): Promise<Review> {
    try {
      return await this.repository.postReview(review);
    } catch (e) {
      throw e;
    }
  }
}
