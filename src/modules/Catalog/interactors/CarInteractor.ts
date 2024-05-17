import { injectable, inject } from "inversify";
import { INTERFACE_TYPE } from "../../../config/DI";
import { CarFiltersDTO } from "../DTOs/CarFiltersDTO";
import { ICarInteractor } from "../interfaces/ICarInteractor";
import { ICarRepository } from "../interfaces/ICarRepository";
import Car from "../entities/Car";
import  Review  from "../entities/Review";


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
  async getCarById(id: number): Promise<Car | null> {
    try {
      return await this.repository.getCarById(id);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async purchaseCar(id: number, quantity: number): Promise<Car | null> {
    try {
      const car = await this.getCarById(id);
      if (car?.quantity) return await this.repository.purchaseCar(id, quantity);
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async addCar(car: Omit<Car, "reviews">): Promise<Omit<Car, "reviews"> | null> {
    try {
      return await this.repository.addCar(car);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async modifyCar(id: number, car: Omit<Partial<Car>, "reviews" | "id">): Promise<Car | null> {
    try {
      return await this.repository.modifyCar(id, car);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async deleteCar(id: number): Promise<Car | null> {
    try {
      return await this.repository.deleteCar(id);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async getCarsOnSale(): Promise<Car[]> {
    try {
      return await this.repository.getCarsOnSale();
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async getCarMakes(): Promise<string[]> {
    try {
      return await this.repository.getCarMakes();
    } catch (e) {
      console.log(e);
      return [];
    }
  }
  async postReview(review: Review): Promise<Review | null> {
    try {
      return await this.repository.postReview(review);
    } catch (error: any) {
      console.log(error);
      return null;
    }
  }
}
