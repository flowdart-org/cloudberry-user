import { ApiResponse } from "../types";
import { productApi, request } from "@/lib/axios";
import { Product } from "@/types/product.types";
import { CreateProductDTO, updateProductDTO } from "./product.dto";

const BASE_URL = '/product';

// export const PRODUCT_SERVICES = {
 
//   getProduct: async (id: string): Promise<ApiResponse<Product>> => {
//     return await request<Product>("get", `${BASE_URL}/${id}`);
//   },

//   getProducts: async (): Promise<ApiResponse<Product[]>> => {
//     return await request<Product[]>("get", `${BASE_URL}`);
//   },

// };

export const PRODUCT_SERVICES = {

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
        const response: any = await productApi.productControllerFindOne(id);
        return response.data;
  },

  getProducts: async (data: any): Promise<ApiResponse<Product[]>> => {
      const response: any = await productApi.productControllerFindAll();
        return response.data;
  },
};
