import { IProduct } from "@/models/product";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class ProductService {
  getProduct(category: string, productId:string): Promise<AxiosResponse<IProduct>> {
    return http.get(`/${category}/${productId}`); // TODO: use correct endpoint
  }
}

export default new ProductService();
