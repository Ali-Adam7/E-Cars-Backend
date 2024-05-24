import { injectable } from "inversify";
import Car from "../entities/Car";
import CarFiltersDTO from "../DTOs/CarFiltersDTO";
import { ICarRepository } from "../interfaces/ICarRepository";
import prisma from "../../../third-party/prisma/prismClient";
import Review from "../entities/Review";
import createError from "http-errors";
import CarDataDTO from "../DTOs/CarDataDTO";
import CarModificationDTO from "../DTOs/CarModificationDTO";

const createPrismFilters = (queryFilters: CarFiltersDTO) => {
  const prismaWhereFilter = {
    ...(queryFilters.make && { make: { in: queryFilters.make } }),
    ...(queryFilters.type && { type: { in: queryFilters.type } }),
  };
  return { ...queryFilters, prismaWhereFilter, sort: queryFilters.sort, page: queryFilters.page };
};
@injectable()
export class CarPrismaRepository implements ICarRepository {
  async getAllCars(): Promise<Car[]> {
    try {
      return await prisma.car.findMany({ include: { reviews: true } });
    } catch (e) {
      throw e;
    }
  }
  async getCarById(id: number): Promise<Car> {
    try {
      const car = await prisma.car.findUnique({ where: { id }, include: { reviews: true } });
      if (!car) throw createError(404, "Car not found");
      return car;
    } catch (e) {
      throw e;
    }
  }
  async getFilteredCars(filters: CarFiltersDTO): Promise<{ cars: Car[]; numberOfPages: number }> {
    try {
      const { prismaWhereFilter, sort, page } = createPrismFilters(filters);
      const cars = await prisma.car.findMany({
        where: prismaWhereFilter,
        take: 3,
        skip: page * 3,
        orderBy: sort,
      });
      const count = await prisma.car.count({
        where: prismaWhereFilter,
      });
      return { cars: cars, numberOfPages: count / 3 };
    } catch (e) {
      throw e;
    }
  }
  async addCar(car: CarDataDTO): Promise<Car> {
    try {
      return await prisma.car.create({ data: car });
    } catch (e) {
      throw e;
    }
  }
  async modifyCar(id: number, car: CarModificationDTO): Promise<Car> {
    try {
      return await prisma.car.update({ where: { id }, data: car });
    } catch (e: any) {
      if (e.code === "P2025") {
        throw createError(404, "Car not found");
      }
      throw e;
    }
  }
  async deleteCar(id: number): Promise<Car> {
    try {
      return await prisma.car.delete({ where: { id } });
    } catch (e: any) {
      if (e.code === "P2025") {
        throw createError(404, "Car not found");
      }
      throw e;
    }
  }
  async purchaseCar(id: number, quantity: number): Promise<Car> {
    try {
      return await prisma.car.update({
        where: { id },
        data: { quantity: { decrement: quantity } },
      });
    } catch (e) {
      throw e;
    }
  }
  async getCarsOnSale(): Promise<Car[]> {
    try {
      return await prisma.car.findMany({ where: { deal: true } });
    } catch (e) {
      throw e;
    }
  }
  async getCarMakes(): Promise<string[]> {
    try {
      const makes = await prisma.car.findMany({
        select: { make: true },
        distinct: ["make"],
      });
      return makes.map((make: { make: string }) => make.make);
    } catch (e) {
      throw e;
    }
  }
  async postReview(review: Review): Promise<Review> {
    try {
      return await prisma.review.create({ data: review });
    } catch (e) {
      throw e;
    }
  }
}
