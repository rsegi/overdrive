import { IRegisterData } from "@/models/registerData";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class AuthenticationService {
  register(data: IRegisterData): Promise<AxiosResponse> {
    return http.post("/auth/register", data);
  }
}

export default new AuthenticationService();
