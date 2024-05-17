import { injectable } from "inversify";
import prisma from "../external_services/prismClient";
import { ICarRepository } from "../interfaces/Catalog/ICarRepository";
import Car, { Review } from "../entities/Car";
import { CarFiltersDTO } from "../interfaces/Catalog/CarFiltersDTO";
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
      return (await prisma.car.findUnique({ where: { id }, include: { reviews: true } })) as Car;
    } catch (e) {
      throw e;
    }
  }
  async getFilteredCars(filters: CarFiltersDTO): Promise<{ cars: Car[]; numberOfPages: number }> {
    try {
      const { prismaWhereFilter, sort, page } = this.createPrismFilters(filters);
      const cars = (await prisma.car.findMany({
        where: prismaWhereFilter,
        take: 3,
        skip: parseInt(page) * 3,
        orderBy: JSON.parse(sort),
      })) as Car[];
      const count = await prisma.car.count({
        where: prismaWhereFilter,
      });
      return { cars: cars, numberOfPages: count / 3 };
    } catch (e) {
      throw e;
    }
  }
  async addCar(car: Omit<Car, "reviews">): Promise<Car> {
    try {
      return await prisma.car.create({ data: car });
    } catch (e) {
      throw e;
    }
  }
  async modifyCar(id: number, car: Omit<Partial<Car>, "id" | "reviews">): Promise<Car> {
    try {
      return await prisma.car.update({ where: { id }, data: car });
    } catch (e) {
      throw e;
    }
  }
  async deleteCar(id: number): Promise<Car> {
    try {
      return await prisma.car.delete({ where: { id } });
    } catch (error: any) {
      throw error;
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
      return makes.map((make) => make.make);
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
  createPrismFilters(queryFilters: CarFiltersDTO) {
    const makeFilter = queryFilters.make?.split(",") as string[];
    const typeFilter = queryFilters.type?.split(",") as string[];
    const history = Boolean(parseInt(String(queryFilters.history)));
    const prismaWhereFilter = {
      make: { in: makeFilter },
      type: { in: typeFilter },
      history: history,
      ...(queryFilters.yeargt && { yeargt: parseInt(String(queryFilters.year)) }),
      ...(queryFilters.yearlt && { yearlt: parseInt(String(queryFilters.year)) }),

      ...(queryFilters.milage && { milage: parseInt(String(queryFilters.year)) }),
      ...(queryFilters.price && { price: parseInt(String(queryFilters.year)) }),
    };
    return { prismaWhereFilter, sort: queryFilters.sort, page: queryFilters.page };
  }
}
