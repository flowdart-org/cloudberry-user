import { cartApi } from "@/lib/axios";
import { ApiResponse } from "../types";
import { CreateCartDto, UpdateCartDto } from "../client";

export const CART_SERVICES = {
   getUserCart: async () => {
      const response = await cartApi.cartControllerGetUserCart();
      return response.data;
    },

    addToCart: async (item: CreateCartDto): Promise<ApiResponse<void>> => {
        console.log(item, ' for add to cart')
      const response: any = await cartApi.cartControllerAddToCart(item);
      return response.data;
    },

    removeItem: async (itemId: string): Promise<ApiResponse> => {
      const response: any = await cartApi.cartControllerRemoveItem(itemId);
      return response.data;
    },


    updateQuantity: async (itemId: string, item: UpdateCartDto): Promise<ApiResponse> => {
      const response: any = await cartApi.cartControllerUpdateQuantity(itemId, item);
      return response.data;
    },
};
