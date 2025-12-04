import { create } from "zustand";
import { Category } from "@/types/category.types";
import { CATEGORY_SERVICES } from "@/api/category/category.service";


interface StoreState {
  categories: Category[];
  loading: boolean
  getInitialCategories: () => Promise<void>;
}

export const useCategoryStore = create<StoreState>()(
    (set, get) => ({
      categories: [],
      loading: false,
      getInitialCategories: async () => {
        try {
         set({loading: true})
          const response = await CATEGORY_SERVICES.getCategories();
          if (response?.data) set({ categories: response.data, loading: false });
        } catch {
         set({loading: false})  
          console.warn("Using local persisted cart.");
        }
      },

    }),
);
