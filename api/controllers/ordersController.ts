import * as express from "express";
import { Router } from "express";
import OrderDto, { getOrderDto } from "../dtos/orderDto";
import { OrderWithProducts } from "../dtos/orderWithProducts";
import HttpException from "../exceptions/httpException";
import db from "../models";
import { ProductAttributes } from "../models/product";
import Controller from "./controller";

class OrdersController implements Controller {
  public path = "/orders";
  public router = Router();
  private order = db.Order;
  private product = db.Product;

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
    const orderId = req.params.orderId;
    const userId = req.params.userId;
    let existingOrder = await this.order.findOne({
      where: { id_order: orderId, user_id: userId },
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

  private createOrder = async (req: express.Request, res: express.Response) => {
    const order: OrderWithProducts = req.body;
    console.log(order);

    let productos: ProductAttributes[] = [];
    order.products.forEach(async (item) => {
      let productItem = await this.product.findByPk(item.product_id);
      productos.push({
        id: productItem.dataValues.id_product,
        name: productItem.dataValues.name,
        price: productItem.dataValues.price,
        image: productItem.dataValues.image,
        description: productItem.dataValues.description,
        category_id: productItem.dataValues.category_id,
      });
    });

    const newOrder = this.order
      .create(
        {
          firstname: order.firstname,
          lastname: order.lastname,
          address: order.address,
          email: order.email,
          city: order.city,
          postalcode: order.postalcode,
          country: order.country,
          user_id: order.user_id,
          products: productos,
        },
        {
          include: ["Product"],
        }
      )
      .then((newOrder2: any) => {
        res.status(201).send(newOrder2);
      });
  };
}

/* private updateOrder = (req: express.Request, res: express.Response) => {
    res.send("Update order");
  };

  private deleteOrder = (req: express.Request, res: express.Response) => {
    res.send("Delete order");
  }; */

export default OrdersController;
