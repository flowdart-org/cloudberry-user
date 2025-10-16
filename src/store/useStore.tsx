import { StaticImageData } from 'next/image';
import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string | StaticImageData;
  category: string;
}

interface StoreState {
  wishlist: number[];
  cart: number[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (productId: number) => void;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  wishlist: [],
  cart: [],
  addToWishlist: (productId) =>
    set((state) => ({
      wishlist: [...state.wishlist, productId],
    })),
  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((id) => id !== productId),
    })),
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),
  addToCart: (productId) =>
    set((state) => ({
      cart: [...state.cart, productId],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((id) => id !== productId),
    })),
}));
