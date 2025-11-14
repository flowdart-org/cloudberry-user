import { PRODUCT_SERVICES } from "@/api/product/product.service";
import { Product } from "@/types/product.types";
import { create } from "zustand";

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   images: string[];
//   category: string;
//   sizes: string[];
// }

interface FilterState {
  sizes: string[];
  priceRanges: string[];
}

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  page: number;
  limit: number;
  category: string;
  filters: FilterState;

  // actions
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
  toggleSizeFilter: (size: string) => void;
  togglePriceFilter: (range: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}


const getPriceRange = (price: number): string => {
  if (price < 500) return "Under ₹500";
  if (price <= 1000) return "₹500 - ₹1000";
  if (price <= 1500) return "₹1000 - ₹1500";
  return "Over ₹1500";
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  page: 1,
  limit: 12,
  category: "all",
  filters: {
    sizes: [],
    priceRanges: [],
  },

  setCategory: (category) => {
    set({ category, page: 1 });
    get().applyFilters();
  },

  setPage: (page) => set({ page }),

  toggleSizeFilter: (size) => {
    const { filters } = get();
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    set({ filters: { ...filters, sizes } });
  },

  togglePriceFilter: (range) => {
    const { filters } = get();
    const priceRanges = filters.priceRanges.includes(range)
      ? filters.priceRanges.filter((r) => r !== range)
      : [...filters.priceRanges, range];
    set({ filters: { ...filters, priceRanges } });
  },

  clearFilters: () => {
    set({ filters: { sizes: [], priceRanges: [] }, page: 1 });
    get().applyFilters();
  },

  applyFilters: async () => {
    const { category, filters } = get();
    
    let filtered: Product[] = [];

    const fetchProducts = async () => {
      const response = await PRODUCT_SERVICES.getFeeds()
      filtered = response.data
    }
    
    await fetchProducts()
    set({ products: filtered, page: 1 });
  },
}));
