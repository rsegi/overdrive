import { ILogInData } from "@/models/logInData";
import { IRegisterData } from "@/models/registerData";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class AuthenticationService {
  register(data: IRegisterData): Promise<AxiosResponse> {
    return http.post("/auth/register", data);
  }
  
  logIn(data: ILogInData): Promise<AxiosResponse> {
    return http.post("/auth/login", data);
  }
}

export default new AuthenticationService();
