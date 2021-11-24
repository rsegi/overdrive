import { ICategory } from "@/models/category";
import { ICategoryListItem } from "@/models/categoryListItem";
import { AxiosResponse } from "axios";
import http from "./common/http-common";

class CategoryService {
  getCategories(): Promise<AxiosResponse<ICategoryListItem[]>> {
    return http.get("/categories");
  }

  getProductsByCategoryId(categoryId: string): Promise<AxiosResponse<ICategory>> {
    return http.get(`/categories/${categoryId}`);
  }
}

export default new CategoryService();
