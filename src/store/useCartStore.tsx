import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CART_SERVICES } from "@/api/cart/cart.service";
import { Product } from "@/types/product.types";
import { VariantDto } from "@/api/client";

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  variantId: string;
  variant: VariantDto;
}

interface StoreState {
  cart: CartItem[];

  // Actions
  getInitialCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
}

export const useCartStore = create<StoreState>()(
    (set, get) => ({
      cart: [],

      getInitialCart: async () => {
        try {
          const response = await CART_SERVICES.getUserCart();
          if (response?.data.items) set({ cart: response.data.items });
        } catch {
          console.warn("Using local persisted cart.");
        }
      },

      addToCart: async (item) => {
        console.log(item, 'hhhh')
        const prev = get().cart;

        const existing = prev.find((i) => i.variantId === item.variantId);

        if (existing) {
          set({
            cart: prev.map((i) =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cart: [...prev, item] });
        }

        try {
          const {data} = await CART_SERVICES.addToCart({
            variantId: item.variantId,
            quantity: item.quantity,
          });
          set({
            cart: get().cart.map((i) =>
              i.variantId === data.variantId
                ? { ...i, id: data.id }
                : i
            ),
          });
        } catch {
          set({ cart: prev }); // rollback
        }
      },

      removeFromCart: async (itemId: string) => {
        const prev = get().cart;
        set({ cart: prev.filter((i) => i.id !== itemId) });

        try {
          await CART_SERVICES.removeItem(String(itemId));
        } catch {
          set({ cart: prev });
        }
      },

      updateCartItemQuantity: async (cartItemId, quantity) => {
        console.log(cartItemId)
        const prev = get().cart;

        set({
          cart: prev.map((i) =>
            i.id === cartItemId ? { ...i, quantity } : i
          ),
        });

        try {
          await CART_SERVICES.updateQuantity(String(cartItemId), { quantity });
        } catch {
          set({ cart: prev });
        }
      },

    }),
);
