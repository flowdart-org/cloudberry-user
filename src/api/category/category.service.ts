import { ApiResponse } from "../types";
import { categoryApi, request } from "@/lib/axios";
import { CreateCategoryDTO, updateCategoryDTO } from "./category.dto";
import { Category } from "@/types/category.types";

// const BASE_URL = '/category';

// export const CATEGORY_SERVICES = {
//   getCategory: async (id: string): Promise<ApiResponse<Category>> => {
//     return await request<Category>("get", `${BASE_URL}/${id}`);
//   },

//   getCategories: async (): Promise<ApiResponse<Category[]>> => {
//     return await request<Category[]>("get", `${BASE_URL}`);
//   },
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
export const CATEGORY_SERVICES = {
  getCategory: async (id: string): Promise<ApiResponse<Category>> => {
    const response: any = await categoryApi.categoryControllerFindOne(id);
    return response.data;
  },

  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response: any = await categoryApi.categoryControllerFindAllActive();
    return response.data ;
  },
};
