import { PRODUCT_SERVICES } from "@/api/product/product.service";
import { ProductDTO } from "@/types/product.types";
import { create } from "zustand";

export interface FilterState {
  sizes: string[];
  minPrice: number | null;
  maxPrice: number | null;
}

interface ProductStore {
  products: ProductDTO[];
  isLoading: boolean;
  page: number;
  limit: number;
  category: string;
  filters: FilterState;

  // actions
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
  toggleSizeFilter: (size: string) => void;
  setPriceRange: (minPrice: number | null, maxPrice: number | null) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}


export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  page: 1,
  limit: 12,
  category: 'all',
  filters: {
    sizes: [],
    minPrice: null,
    maxPrice: null
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

  clearFilters: () => {
    set({ filters: { sizes: [], minPrice: null, maxPrice: null }, page: 1 });
    get().applyFilters();
  },

  setPriceRange: (minPrice, maxPrice) =>{
    set((state) => ({
      filters: { ...state.filters, minPrice, maxPrice },
    }))
  },

  applyFilters: async () => {
    const { category, filters, page } = get();
    
    let filtered: ProductDTO[] = [];

    const fetchProducts = async () => {
      const response = await PRODUCT_SERVICES.getFeeds({
        categories: category !== 'all' ? [category] : undefined,
        minPrice: filters.minPrice ? filters.minPrice : undefined,
        maxPrice: filters.maxPrice ? filters.maxPrice : undefined,
        page
      })
      if (response.data) {
        filtered = response.data
      }
    }
    
    await fetchProducts()
    set({ products: filtered, page: 1 });
  },
}));
