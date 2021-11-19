import * as express from "express";
import { Router } from "express";
import OrderDto, { getOrderDto } from "../dtos/orderDto";
import HttpException from "../exceptions/httpException";
import db from "../models";
import Controller from "./controller";

class OrdersController implements Controller {
  public path = "/orders";
  public router = Router();
  private order = db.Order;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getOrderById);
    this.router.post(this.path, this.createOrder);
    //this.router.put(`${this.path}/:id`, this.updateOrder);
    //this.router.delete(`${this.path}/:id`, this.deleteOrder);
  }

  private getOrderById = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const orderId = req.params.id;
    let existingOrder = await this.order.findOne({
      where: { id: orderId },
      include: [
        {
          model: db.Product,
          as: "products",
          include: [
            {
              model: db.OrderProduct,
              as: "orderProducts",
              include: [
                {
                  model: db.Product,
                  as: "product",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!existingOrder) {
      next(new HttpException(404, `Order with id ${orderId} not found`));
    }

    const orderDto: OrderDto = getOrderDto(existingOrder);
    res.send(orderDto);
  };

  private createOrder = (req: express.Request, res: express.Response) => {
    const order = req.body;
    this.order.create(order);
    res.status(201).send(order);
  };

  /* private updateOrder = (req: express.Request, res: express.Response) => {
    res.send("Update order");
  };

  private deleteOrder = (req: express.Request, res: express.Response) => {
    res.send("Delete order");
  }; */
}
