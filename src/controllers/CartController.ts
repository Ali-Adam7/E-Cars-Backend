import { NextFunction, Request, Response } from "express";

import { injectable, inject } from "inversify";
import createError from "http-errors";
import { ICartInteractor } from "../interfaces/ICartInteractor";
import { INTERFACE_TYPE } from "../config/DI";

@injectable()
export class CartController {
  private interactor: ICartInteractor;

  constructor(@inject(INTERFACE_TYPE.CartInteractor) interactor: ICartInteractor) {
    this.interactor = interactor;
  }

  async onGetCartById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      const cart = await this.interactor.getCartById(userId);
      return res.json(cart);
    } catch (e) {
      next(e);
    }
  }
  async onAddCar(req: Request, res: Response, next: NextFunction) {
    const userId = parseInt(req.params.userId);
    const carId = parseInt(req.params.carId);
    const quantity = parseInt(req.body.quantity);
    if (!quantity || quantity < 1) return next(createError(400, "invalid quantity"));
    try {
      const cartItem = await this.interactor.addCar(userId, carId, quantity);
      return res.status(201).json(cartItem);
    } catch (e) {
      next(e);
    }
  }
  async onDeleteCart(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      const cart = await this.interactor.deleteCart(userId);
      return res.status(202).json(cart);
    } catch (e) {
      next(e);
    }
  }

  async onDeleteCar(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      const carId = parseInt(req.params.carId);
      await this.interactor.deleteCar(userId, carId);
      return res.sendStatus(202);
    } catch (e) {
      next(e);
    }
  }
  async onSubmitOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      await this.interactor.submitOrder(userId);
      return res.send("Success");
    } catch (e) {
      next(e);
    }
  }
  async onGetPastOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.userId);
      const pastOrders = await this.interactor.getPastOrders(userId);
      return res.status(200).json(pastOrders);
    } catch (e) {
      next(e);
    }
  }
}
