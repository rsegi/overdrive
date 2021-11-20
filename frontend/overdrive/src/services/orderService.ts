import { IOrder } from "@/models/order";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class ProductService {
  placeOrder(order: IOrder): Promise<AxiosResponse> {
    return http.post("/orders", order);
  }
}

export default new ProductService();
