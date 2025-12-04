import { ApiResponse } from "../types";
import { categoryApi, request } from "@/lib/axios";
import { Category } from "@/types/category.types";

export const CATEGORY_SERVICES = {
  getCategory: async (id: string): Promise<Category | undefined> => {
    const response = await request(categoryApi.categoryControllerFindOne.bind(categoryApi), id) as ApiResponse<Category>;
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    return await request(categoryApi.categoryControllerFindAllActive.bind(categoryApi)) as ApiResponse<Category[]>;
  },
};
