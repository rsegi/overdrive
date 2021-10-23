import Controller from "../controller";
import * as express from "express";
import { UserAttributes } from "../../models/user";
import HttpException from "../../exceptions/httpException";
import * as bcrypt from "bcrypt";
import LogInDto from "./logInDto";
import AuthenticationService from "../../services/authenticationService";
import authMiddleware from "../../middleware/authenticationMiddleware";

const { User } = require("../models");

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = express.Router();
  public authenticationService = new AuthenticationService();
  private user = User;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registration);
    this.router.post(`${this.path}/login`, this.logIn);
    this.router.post(`${this.path}/logout`, this.logOut);
  }

  private registration = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const userData: UserAttributes = req.body;
    let existingUser: UserAttributes = await this.user.findOne({
      where: { id: userData.email },
    });

    if (existingUser) {
      next(
        new HttpException(403, "A user with that email is already registered")
      );
    } else {
      const hashedPassword = await bcrypt.hash(userData.hashed_password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = undefined;
      const tokenData = this.authenticationService.createToken(user);
      res.setHeader("Set-Cookie", [
        this.authenticationService.createCookie(tokenData),
      ]);
      res.send(user);
    }
  };

  private logIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const logInData: LogInDto = req.body;
    const userData = await this.user.findOne({ email: logInData.email });
    if (userData) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        userData.password
      );
      if (isPasswordMatching) {
        userData.password = undefined;
        const tokenData = this.authenticationService.createToken(userData);
        res.setHeader("Set-Cookie", [
          this.authenticationService.createCookie(tokenData),
        ]);
        res.send(userData);
      } else {
        next(new HttpException(401, "Wrong credentials provided"));
      }
    } else {
      next(new HttpException(401, "Wrong credentials provided"));
    }
  };

  private logOut = async (req: express.Request, res: express.Response) => {
    res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
    res.send(200);
  };
}

export default AuthenticationController;
