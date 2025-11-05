import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
}

interface FilterState {
  sizes: string[];
  priceRanges: string[];
}

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
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

// Mock product data
const mockProducts: Product[] = [
  { id: "1", name: "Classic White Tee", price: 599, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["S", "M", "L", "XL"] },
  { id: "2", name: "Denim Jacket", price: 2499, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["M", "L", "XL"] },
  { id: "3", name: "Slim Fit Jeans", price: 1799, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "4", name: "Leather Boots", price: 3499, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["M", "L", "XL"] },
  { id: "5", name: "Casual Shirt", price: 899, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["S", "M", "L", "XL"] },
  { id: "6", name: "Hoodie", price: 1299, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "fancy", sizes: ["M", "L", "XL", "XXL"] },
  { id: "7", name: "Chinos", price: 1599, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["S", "M", "L", "XL"] },
  { id: "8", name: "Bomber Jacket", price: 2899, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "fancy", sizes: ["M", "L", "XL"] },
  { id: "9", name: "Polo Shirt", price: 799, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "10", name: "Sneakers", price: 2199, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["M", "L", "XL"] },
  { id: "11", name: "Sweatpants", price: 1099, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["S", "M", "L", "XL"] },
  { id: "12", name: "Winter Coat", price: 4599, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "men", sizes: ["L", "XL", "XXL"] },
  { id: "13", name: "Summer Dress", price: 1899, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "women", sizes: ["XS", "S", "M", "L"] },
  { id: "14", name: "Blazer", price: 3299, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "women", sizes: ["S", "M", "L", "XL"] },
  { id: "15", name: "Midi Skirt", price: 1299, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "women", sizes: ["XS", "S", "M", "L"] },
  { id: "16", name: "Blouse", price: 999, images: ["https://cloudberrybucket.blob.core.windows.net/images/category/cmhilgm360001nw9eb7yie3ii?sv=2025-11-05&spr=https&se=2025-11-03T08%3A30%3A57Z&sr=b&sp=r&sig=%2FFnnrFrp1Oqhay1r79NBj2KM9l0NB%2FSA5Ho2lwVhYr0%3D"], category: "women", sizes: ["XS", "S", "M", "L", "XL"] },
];

const getPriceRange = (price: number): string => {
  if (price < 500) return "Under ₹500";
  if (price <= 1000) return "₹500 - ₹1000";
  if (price <= 1500) return "₹1000 - ₹1500";
  return "Over ₹1500";
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: mockProducts,
  filteredProducts: mockProducts,
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

  applyFilters: () => {
    const { products, category, filters } = get();
    
    let filtered = products;

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    // Filter by size
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    // Filter by price range
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter((p) =>
        filters.priceRanges.includes(getPriceRange(p.price))
      );
    }

    set({ filteredProducts: filtered, page: 1 });
  },
}));
