import { StaticImageData } from 'next/image';
import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string | StaticImageData;
  category: string;
}

export interface CartItem {
  productId: number;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

interface StoreState {
  wishlist: number[];
  cart: CartItem[];
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (productId: number) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
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
  addToCart: (item) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (cartItem) => cartItem.productId === item.productId && 
                      cartItem.size === item.size && 
                      cartItem.color === item.color
      );
      
      if (existingItemIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return { cart: updatedCart };
      }
      
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  updateCartItemQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
  getCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
}));
