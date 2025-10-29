import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PRODUCT_SERVICES } from "@/api/product/product.service";
import { Product } from "@/types/product.types";

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  category: string;

  // actions
  fetchProducts: (page?: number, category?: string) => Promise<void>;
  setCategory: (category: string) => void;
  setPage: (page: number) => void;
}

export const useProductStore = create<ProductStore>()(
  devtools(
    (set, get) => ({
      products: [],
      isLoading: false,
      error: null,
      page: 1,
      limit: 12,
      total: 0,
      category: "ALL",

      fetchProducts: async (page = get().page, category = get().category) => {
        try {
          set({ isLoading: true, error: null });

          const response = await PRODUCT_SERVICES.getProducts({
            page,
            limit: get().limit,
            category: category !== "ALL" ? category : undefined,
          });

          set({
            products: response.data || [],
            total: 12,
            page,
            category,
          });
        } catch (error: any) {
          console.error("Failed to fetch products:", error);
          set({ error: error.message || "Failed to load products" });
        } finally {
          set({ isLoading: false });
        }
      },

      setCategory: (category) => set({ category }),
      setPage: (page) => set({ page }),
    }),
    { name: "ProductStore" }
  )
);
