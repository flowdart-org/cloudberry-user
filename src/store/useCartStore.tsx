import { create } from "zustand";
import { CART_SERVICES } from "@/api/cart/cart.service";
import {  CartItem } from "@/types/cart.types"; 

interface StoreState {
  cart: CartItem[];
  cartLoading: boolean;

  getInitialCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
}

export const useCartStore = create<StoreState>()((set, get) => ({
  cart: [],
  cartLoading: false,

  getInitialCart: async () => {
    try {
      set({ cartLoading: true })
      const response = await CART_SERVICES.getUserCart();
      if (response?.data?.items) {
        set({ cart: response.data.items });
      }
    } catch {
      console.warn("Failed syncing cart with server — using local state.");
    } finally {
      set({cartLoading: false})
    }
  },

  addToCart: async (item: CartItem) => {
  const prev = get().cart;

  // Check if item already exists in cart
  const existing = prev.find(i => i.variant.id === item.variant.id);

  // --------------------------------
  // CASE 1: Item already exists → update quantity
  // --------------------------------
  if (existing) {

    const newQuantity = (existing.quantity ?? 0) + (item.quantity ?? 1);

    // Optimistic UI update
    set({
      cart: prev.map(i =>
        i.variant.id === item.variant.id
          ? { ...i, quantity: newQuantity }
          : i
      ),
    });

    try {
      await CART_SERVICES.updateQuantity(existing.id, { quantity: newQuantity });

    } catch (error) {
      // rollback if server fails
      console.error(error)
      set({ cart: prev });
    }

    return; // exit here, no further addToCart call needed
  }

  // --------------------------------
  // CASE 2: Item is NEW → normal addToCart behavior
  // --------------------------------
  set({ cart: [...prev, { ...item, id: item.id }] });

  try {
    const response = await CART_SERVICES.addToCart({
      variantId: item.variant.id,
      quantity: item.quantity ?? 1,
    });

    set({
      cart: get().cart.map(i =>
        i.variant.id === response.data?.variant.id
          ? { ...i, ...response }
          : i
      ),
    });
  } catch {
    set({ cart: prev });
  }
},

  removeFromCart: async (itemId: string) => {
    const prev = get().cart;
    set({ cart: prev.filter(i => i.id !== itemId) });

    try {
      await CART_SERVICES.removeItem(itemId);
    } catch {
      set({ cart: prev });
    }
  },

  updateCartItemQuantity: async (cartItemId, quantity) => {
    const prev = get().cart;

    set({
      cart: prev.map(i =>
        i.id === cartItemId ? { ...i, quantity } : i
      ),
    });

    try {
      await CART_SERVICES.updateQuantity(cartItemId, { quantity });
    } catch {
      set({ cart: prev });
    }
  },
}));
