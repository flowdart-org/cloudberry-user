import { ApiResponse } from "../types";
import { productApi } from "@/lib/axios";
import { Product, ProductDetails } from "@/types/product.types";
import { ProductResponseDto } from "../client";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const PRODUCT_SERVICES = {
  getProduct: async (id: string): Promise<ApiResponse<ProductDetails>> => {
        const response: any = await productApi.productControllerFindOne(id);
        console.log(response, 'its respnse')
        return response.data;
  },

  getProducts: async (data: any): Promise<ApiResponse<Product[]>> => {
      const response: any = await productApi.productControllerFindAll();
        return response.data;
  },

  getFeeds: async (d?: any): Promise<ApiResponse<ProductResponseDto[]>> => {
      const response = await productApi.productControllerFindFeed();
        return response.data;
  },
};
