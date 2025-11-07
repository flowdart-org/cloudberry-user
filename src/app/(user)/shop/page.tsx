"use client"

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import FilterSection from "@/components/product/FilterSection";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/useProductStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Shop = () => {
  const { products, page, limit, setPage, category, setCategory } = useProductStore();
  const {category: pathCategory} = useParams()

  useEffect(() => {
    if(pathCategory) setCategory(pathCategory as string)
  }, [])

  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  return (
    <div className="min-h-screen flex flex-col">
      <Header categories={true}/>

      <main className="flex-1">
        <div className="px-4 md:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
            <FilterSection />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold tracking-tight uppercase">{category}</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No products found with selected filters</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => useProductStore.getState().clearFilters()}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 mb-5">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4">
                      <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="min-w-20"
                      >
                        PREV
                      </Button>
                      <span className="text-sm font-medium">
                        {page} / {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="min-w-20"
                      >
                        NEXT
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
