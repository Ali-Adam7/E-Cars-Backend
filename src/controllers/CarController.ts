import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthInteractor } from "../interfaces/Authentication/IAuthInteractor";
import UserDataDTO from "../interfaces/Authentication/UserDataDTO";
import RequestAuthDTO from "../interfaces/Authentication/RequestAuthDTO";
import { INTERFACE_TYPE } from "../config/DI";
import { ICarInteractor } from "../interfaces/Catalog/ICarInteractor";
import { HttpError } from "http-errors";
import { Review } from "../entities/Car";

@injectable()
export class CarController {
  private interactor: ICarInteractor;

  constructor(@inject(INTERFACE_TYPE.CarInteractor) interactor: ICarInteractor) {
    this.interactor = interactor;
  }

  async onGetCarById(req: Request, res: Response, next: NextFunction) {
    try {
      const carId = parseInt(req.params.id);
      const car = await this.interactor.getCarById(carId);
      return res.status(200).json(car);
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
      const review = req.body as Review;
      const postedReview = await this.interactor.postReview(review);
      return res.status(201).send(postedReview);
    } catch (error) {
      next(error);
    }
  }
  onError(e: HttpError, req: Request, res: Response, next: NextFunction) {
    console.error(e);
    res.status(e.statusCode).json({ message: e.message });
  }
}
