import * as express from "express";
import authMiddleware from "../middleware/authenticationMiddleware";
import Controller from "./controller";
import db from "../models";

class UsersController implements Controller {
  public path = "/users";
  public router = express.Router();
  public user = db.User;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `this.path/:userId/orders`,
      authMiddleware,
      this.getAllOrdersByUserId
    );
    this.router.delete(`${this.path}/:userId`, authMiddleware, this.removeOne);
  }

  private getAllOrdersByUserId = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userId = req.params.userId;
    const orders = await this.user.findByPk(userId, {
      include: [
        {
          model: db.Order,
          as: "orders",
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
        },
      ],
    });
    res.send(orders);
  };

  removeOne = async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.params;
      await this.user.destroy({
        where: { id: userId },
      });
      res.status(200);
    } catch (error) {
      console.log("Error: ", error);
      res.sendStatus(400);
    }
  };
}

export default UsersController;
