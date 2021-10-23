import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import HttpException from "../exceptions/httpException";
import RequestWithUser from "../interfaces/requestWithUser";
import { DataStoredInToken } from "../services/authenticationService";

const { User } = require("../models");

async function authMiddleware(
  request: RequestWithUser,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await User.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } catch (error) {
      next(new HttpException(401, "Wrong authentication token"));
    }
  } else {
    next(new HttpException(401, "Wrong authentication token"));
  }
}

export default authMiddleware;
