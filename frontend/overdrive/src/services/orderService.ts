import { IOrder } from "@/models/order";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class ProductService {
  getOrders(): Promise<AxiosResponse<IOrder[]>> {
    return http.get("/orders"); // TODO: get order by user id
  }

  placeOrder(order: IOrder): Promise<AxiosResponse> {
    return http.post("/orders", order);
  }
}

export default new ProductService();
