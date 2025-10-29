"use client";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { useProductStore } from "@/store/useProductStore";

const categories = ["ALL", "TROUSERS", "SHIRTS", "JEANS", "T-SHIRTS", "LUXE", "FORMAL WEAR"];

const Shop = () => {
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const {
    products,
    isLoading,
    category,
    page,
    total,
    fetchProducts,
    setCategory,
    setPage,
  } = useProductStore(
    useShallow((state) => ({
      products: state.products,
      isLoading: state.isLoading,
      category: state.category,
      page: state.page,
      total: state.total,
      fetchProducts: state.fetchProducts,
      setCategory: state.setCategory,
      setPage: state.setPage,
    }))
  );

  useEffect(() => {
    fetchProducts(page, category);
  }, [page, category]);

  const totalPages = Math.ceil(total / 12);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-foreground text-background py-2 text-center text-sm">
        Free shipping on order over ₹1000
      </div>

      <main className="flex-1">
        <div className="px-4 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <h1 className="text-3xl font-bold mb-8 text-foreground">TROUSER</h1>

              {/* Size Filter */}
              <div className="mb-6 border-b border-border pb-4">
                <button
                  onClick={() => setSizeOpen(!sizeOpen)}
                  className="flex items-center justify-between w-full text-left font-semibold text-foreground mb-3"
                >
                  SIZE
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${sizeOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {sizeOpen && (
                  <div className="space-y-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <label key={size} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-foreground">{size}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Filter */}
              <div className="mb-6 border-b border-border pb-4">
                <button
                  onClick={() => setColorOpen(!colorOpen)}
                  className="flex items-center justify-between w-full text-left font-semibold text-foreground mb-3"
                >
                  COLOR
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${colorOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {colorOpen && (
                  <div className="space-y-2">
                    {["Black", "White", "Blue", "Red", "Gray", "Beige"].map((color) => (
                      <label key={color} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-foreground">{color}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Filter */}
              <div className="mb-6 pb-4">
                <button
                  onClick={() => setPriceOpen(!priceOpen)}
                  className="flex items-center justify-between w-full text-left font-semibold text-foreground mb-3"
                >
                  PRICE
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${priceOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {priceOpen && (
                  <div className="space-y-2">
                    {["Under ₹500", "₹500 - ₹1000", "₹1000 - ₹1500", "Over ₹1500"].map(
                      (range) => (
                        <label key={range} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="rounded border-border" />
                          <span className="text-sm text-foreground">{range}</span>
                        </label>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  CLEAR
                </Button>
                <Button variant="default" className="flex-1">
                  APPLY
                </Button>
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-1 mb-6">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={category === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCategory(cat)}
                    className="text-xs md:text-sm"
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Product Grid */}
              {isLoading ? (
                <div className="text-center py-10">Loading products...</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-2 mb-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Prev
                </Button>
                <span className="px-4 py-2 text-sm">
                  {page} / {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
