import Controller from "../controller";
import * as express from "express";
import { UserAttributes } from "../../models/user";
import HttpException from "../../exceptions/httpException";
import * as bcrypt from "bcrypt";
import LogInDto, { getLoginDto } from "./logInDto";
import AuthenticationService from "../../services/authenticationService";
import db from "../../models";
import { getUserDto } from "../../dtos/userDto";

class AuthenticationController implements Controller {
  public path = "/auth";
  public router = express.Router();
  public authenticationService = new AuthenticationService();
  private user = db.User;

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
      where: { email: userData.email },
    });

    if (existingUser) {
      next(
        new HttpException(403, "A user with that email is already registered")
      );
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = undefined;
      const tokenData = this.authenticationService.createToken(user);
      res.cookie("Authorization", tokenData.token, {
        maxAge: tokenData.expiresIn,
        httpOnly: true,
      });
      res.send(getUserDto(user));
    }
  };

  private logIn = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const logInData = req.body;
    const userData = await this.user.findOne({ email: logInData.email });

    if (userData) {
      const user: LogInDto = getLoginDto(userData);
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        userData.password = undefined;
        const tokenData = this.authenticationService.createToken(userData);
        res.cookie("Authorization", tokenData.token, {
          httpOnly: true,
          maxAge: tokenData.expiresIn,
        });
        res.status(200).send(getUserDto(user));
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
