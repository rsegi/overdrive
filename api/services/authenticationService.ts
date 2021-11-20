import { UserAttributes } from "../models/user";
import * as jwt from "jsonwebtoken";

const { User } = require("../models");

interface TokenData {
  token: string;
  expiresIn: number;
}

export interface DataStoredInToken {
  _id: string;
}

class AuthenticationService {
  public user = User;

  public createToken(user: UserAttributes): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = (process.env.JWT_SECRET as string) || "my-secret";
    const dataStoredInToken: DataStoredInToken = {
      _id: user.id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
