import { ICategory } from "@/models/category";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class CategoryService {
  getCategories(): Promise<AxiosResponse<ICategory[]>> {
    return http.get("/categories");
  }
  
  getCategory(categoryId: string): Promise<AxiosResponse<ICategory>> {
    return http.get(`categories/${categoryId}/`); // TODO: how to get the products from category?
  }
}

export default new CategoryService();
