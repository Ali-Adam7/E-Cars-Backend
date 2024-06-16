import { NextFunction, Request, Response } from "express";
import { injectable, inject } from "inversify";
import { ICarInteractor } from "../interfaces/ICarInteractor";
import Review from "../entities/Review";
import CarDataDTO from "../DTOs/CarDataDTO";
import CarModificationDTO from "../DTOs/CarModificationDTO";
import CarFiltersDTO from "../DTOs/CarFiltersDTO";
import ReviewDTO from "../DTOs/ReviewDTO";
import { INTERFACE_TYPE } from "../config/DI";

const createFilter = (queryFilters: any): CarFiltersDTO => {
  return {
    page: parseInt(queryFilters.page),
    ...(queryFilters.make && { make: queryFilters.make?.split(",") }),
    ...(queryFilters.type && { type: queryFilters.type?.split(",") }),

    ...(queryFilters.yeargt && { yeargt: parseInt(queryFilters.yeargt) }),
    ...(queryFilters.yearlt && { yearlt: parseInt(queryFilters.yearlt) }),

    ...(queryFilters.milage && { milage: parseInt(queryFilters.milage) }),
    ...(queryFilters.price && { price: parseInt(queryFilters.price) }),
    sort: queryFilters.sort ? JSON.parse(queryFilters.sort) : { price: "desc" },
  };
};
@injectable()
export class CarController {
  private interactor: ICarInteractor;
  constructor(@inject(INTERFACE_TYPE.CarInteractor) interactor: ICarInteractor) {
    this.interactor = interactor;
  }

  async onGetCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = req.params.id;
      if (carId === "sale") {
        const sale = await this.interactor.getCarsOnSale();
        return res.status(200).json(sale);
      }
      const car = await this.interactor.getCarById(parseInt(carId));
      return res.status(200).json(car);
    } catch (error) {
      next(error);
    }
  }

  async onGetCarsByFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = createFilter(req.query);
      const cars = await this.interactor.getFilteredCars(filter);
      return res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }
  async onGetCarMakes(req: Request, res: Response, next: NextFunction) {
    try {
      const makes = await this.interactor.getCarMakes();
      return res.status(200).json(makes);
    } catch (error) {
      next(error);
    }
  }

  async onPostReview(req: Request, res: Response, next: NextFunction) {
    try {
      const reviewData = req.body as ReviewDTO;
      const { time } = reviewData;
      const review = { ...reviewData, time: new Date(time) } as Review;
      const postedReview = await this.interactor.postReview(review);
      return res.status(201).send(postedReview);
    } catch (error) {
      next(error);
    }
  }
  async onDeleteCar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      await this.interactor.deleteCar(id);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
  async onModifyCar(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as string);
      const modifiedCar = req.body as CarModificationDTO;
      await this.interactor.modifyCar(id, modifiedCar);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
  async onAddCar(req: Request, res: Response, next: NextFunction) {
    try {
      const car = req.body as CarDataDTO;
      await this.interactor.addCar(car);
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }

  async onPurchaseCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { carId, quantity } = req.body;
      await this.interactor.purchaseCar(carId, quantity);
      return res.sendStatus(202);
    } catch (error) {
      next(error);
    }
  }
}
