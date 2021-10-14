import { AxiosResponse } from "axios";
import http from "../common/http-common";

class TestService {
  getMessage(): Promise<AxiosResponse<string>> {
    return http.get("/");
  }
}

export default new TestService();
