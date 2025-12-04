import { cartApi, request } from "@/lib/axios";
import { ApiResponse } from "../types";
import { CheckoutCartResponseDto, CreateCartDto, UpdateCartDto } from "../client";
import { AddToCartResponseDto, CartResponseDto } from "./cart.dto";

export const CART_SERVICES = {
   getUserCart: async (): Promise<ApiResponse<CartResponseDto>> => {
     return await request(cartApi.cartControllerGetUserCart.bind(cartApi)) as ApiResponse<CartResponseDto>;
    },

    addToCart: async (item: CreateCartDto): Promise<AddToCartResponseDto> => {
      return await request(cartApi.cartControllerAddToCart.bind(cartApi), item) as ApiResponse<AddToCartResponseDto>
    },

    removeItem: async (itemId: string): Promise<void> => {
      await cartApi.cartControllerRemoveItem(itemId)
    },

    checkout: async (): Promise<ApiResponse<CheckoutCartResponseDto>> => {
      return await request(cartApi.cartControllerCheckout.bind(cartApi)) as ApiResponse<CheckoutCartResponseDto>;
    },


    updateQuantity: async (itemId: string, item: UpdateCartDto): Promise<void> => {
      await cartApi.cartControllerUpdateQuantity(itemId, item);
    },
};
