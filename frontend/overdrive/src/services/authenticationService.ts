import { ILogInData } from "@/models/logInData";
import { IRegisterData } from "@/models/registerData";
import { IUser } from "@/models/user";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class AuthenticationService {
  register(data: IRegisterData): Promise<AxiosResponse> {
    return http.post("/auth/register", data);
  }

  logIn(data: ILogInData): Promise<AxiosResponse<IUser>> {
    return http.post("/auth/login", data);
  }

  logOut(): Promise<AxiosResponse> {
    return http.post("/auth/logout");
  }
}

export default new AuthenticationService();
