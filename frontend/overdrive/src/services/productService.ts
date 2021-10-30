import { Product } from "@/models/product";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class ProductService {
  getProducts(): Promise<AxiosResponse<Product[]>> {
    return http.get("/products"); // TODO: use correct endpoint
  }
  
  getProduct(category: string, productId:string): Promise<AxiosResponse<Product>> {
    return http.get(`/${category}/${productId}`); // TODO: use correct endpoint
  }
}

export default new ProductService();
