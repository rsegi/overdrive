import { IProduct } from "@/models/product";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class ProductService {
  getProduct(productId:string): Promise<AxiosResponse<IProduct>> {
    return http.get(`/products/${productId}`);
  }
}

export default new ProductService();
