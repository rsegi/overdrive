import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import HttpException from "../exceptions/httpException";
import RequestWithUser from "../interfaces/requestWithUser";
import { DataStoredInToken } from "../services/authenticationService";

const { User } = require("../models");

async function authMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET || "my-secret";
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await User.findById(id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.clearCookie("Authorization");
        next(new HttpException(401, "Wrong authentication token"));
      }
    } catch (error) {
      res.clearCookie("Authorization");
      next(new HttpException(401, "Wrong authentication token"));
    }
  } else {
    res.clearCookie("Authorization");
    next(new HttpException(401, "Wrong authentication token"));
  }
}

export default authMiddleware;
