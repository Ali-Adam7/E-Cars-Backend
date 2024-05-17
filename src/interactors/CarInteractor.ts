import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../config/DI";
import AuthenticatedUserDTO from "../interfaces/Authentication/AuthenticatedUserDTO";
import { ICrypt } from "../interfaces/Authentication/ICrypt";
import { IToken } from "../interfaces/Authentication/IToken";
import RegisterUserDTO from "../interfaces/Authentication/RegisterUserDTO";
import UserDataDTO from "../interfaces/Authentication/UserDataDTO";
import { ICarInteractor } from "../interfaces/Catalog/ICarInteractor";
import { ICarRepository } from "../interfaces/Catalog/ICarRepository";
import Car, { Review } from "../entities/Car";
import { CarFiltersDTO } from "../interfaces/Catalog/CarFiltersDTO";

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
  async addCar(car: Omit<Car, "reviews">): Promise<Car | null> {
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
