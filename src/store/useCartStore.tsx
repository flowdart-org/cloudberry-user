import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CART_SERVICES } from "@/api/cart/cart.service";
import { Product } from "@/types/product.types";
import { VariantDto } from "@/api/client";

export interface CartItem {
  id: string;
  productId: number;
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
  updateCartItemQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],

      getInitialCart: async () => {
        try {
          const response = await CART_SERVICES.getUserCart();
          if (response?.items) set({ cart: response.items });
        } catch {
          console.warn("Using local persisted cart.");
        }
      },

      addToCart: async (item) => {
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
          await CART_SERVICES.addToCart({
            variantId: item.variantId,
            quantity: item.quantity,
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

      updateCartItemQuantity: async (productId, quantity) => {
        const prev = get().cart;

        set({
          cart: prev.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        });

        try {
          await CART_SERVICES.updateQuantity(String(productId), { quantity });
        } catch {
          set({ cart: prev });
        }
      },

    }),
    {
      name: "user-cart",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
