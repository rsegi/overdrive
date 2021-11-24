import { IOrderDetail } from "@/models/order";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class UserService {
  getOrders(userId: string): Promise<AxiosResponse<IOrderDetail>> {
    return http.get(`/users/${userId}/orders`); // TODO: get order by user id
  }
}

export default new UserService();
