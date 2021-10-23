import * as express from "express";
import authMiddleware from "../middleware/authenticationMiddleware";
import { UserAttributes } from "../models/user";
import Controller from "./controller";

const { User } = require("../models");

class UsersController implements Controller {
  public path = "/users";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.delete(`${this.path}/:userId`, authMiddleware, this.removeOne);
  }

  removeOne = async (req: express.Request, res: express.Response) => {
    try {
      const { userId } = req.params;
      await User.destroy({
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
