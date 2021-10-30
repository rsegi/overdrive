import { AxiosResponse } from "axios";
import http from "./common/http-common";

class ProductService {
  getProducts(): Promise<AxiosResponse<string>> {
    return http.get("/");
  }
}

export default new ProductService();
