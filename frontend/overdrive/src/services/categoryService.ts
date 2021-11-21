import { ICategory } from "@/models/category";
import { IProduct } from "@/models/product";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class CategoryService {
  getCategories(): Promise<AxiosResponse<ICategory[]>> {
    return http.get("/categories");
  }

  getProductsByCategoryId(categoryId: string): Promise<AxiosResponse<IProduct[]>> {
    return http.get(`/categories/${categoryId}/`);
  }
}

export default new CategoryService();
