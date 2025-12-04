import { CartItem } from "@/types/cart.types";

 
export interface AddToCartResponseDto {
    cartId: string;
    id: string;
    productId: string;
    quantity: number;
    variantId: string;
}

export interface CartResponseDto {
    id: string;
    count: number;
    items: CartItem[];
}