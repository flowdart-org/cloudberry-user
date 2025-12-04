import { ProductDTO } from "@/types/product.types";
import { ApiResponse } from "../types";
import { productApi, request } from "@/lib/axios";
import { FilterState } from "@/store/useProductStore";

 
export const PRODUCT_SERVICES = {
  getProduct: async (id: string): Promise<ApiResponse<ProductDTO>> => {
        return await request(productApi.productControllerFindOne.bind(productApi) ,id) as ApiResponse<ProductDTO>;
  },

  getProducts: async (): Promise<ProductDTO[] | undefined> => {
      const response = await request(productApi.productControllerFind.bind(productApi)) as ApiResponse<ProductDTO[]>;
        return response.data;
  },

  getFeeds: async ({ page, limit, search, minPrice, maxPrice, categories, size}: {page?: number | undefined, limit?: number, search?: string, minPrice?: number, maxPrice?: number, categories?: string[], size?: string}): Promise<ApiResponse<ProductDTO[]>> => {
      return await request(productApi.productControllerFindFeed.bind(productApi), page, limit, search, minPrice, maxPrice, categories, size) as ApiResponse<ProductDTO[]>;
  },
};
