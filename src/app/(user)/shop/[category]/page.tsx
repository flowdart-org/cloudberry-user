"use client"

import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import FilterSection from "@/components/product/FilterSection";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductStore } from "@/store/useProductStore";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Category } from "@/types/category.types";
import CategoryBar from "@/components/category/CategoryBar";


const Shop = () => {
  const { products, page, limit, setPage, setCategory } = useProductStore();
  const { categories } = useCategoryStore()
  const { category: pathCategory } = useParams() as {category: string}
  const [categoryData, setCategoryData] = useState<null | Category>(null)

  useEffect(() => {
  if (!categories.length) return; 

  if (!pathCategory || pathCategory === "all") {
    setCategory('all'); 
    return;
  }

  // Treat the route param as a category id (not the name)
  const matched = categories.find(
    (c) => String(c.id) === pathCategory
  );

  if (matched) {
    setCategoryData(matched);
    setCategory(matched.id);
  } else {
    redirect("/shop/all");
  }
}, [categories, pathCategory, setCategory, setCategoryData]);

  const startIdx = (page - 1) * limit;
  const endIdx = startIdx + limit;
  const paginatedProducts = products.slice(startIdx, endIdx);
  const totalPages = Math.ceil(products.length / limit);

  return (
    <div className="min-h-screen flex flex-col">
      <Header categories={true} />

      <main className="flex-1">
        <div className="px-4 md:px-8 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
            <FilterSection />
            <div className="flex-1">
              <CategoryBar showCategories isShop />
              <div className="flex items-center justify-between mb-8 mt-3">
                <h1 className="text-2xl font-bold tracking-tight uppercase">{categoryData ? categoryData.name : pathCategory}</h1>
                <p className="text-sm text-neutral-400 ">
                  {products.length} products
                </p>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-neutral-400 ">No products found with selected filters</p>
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
                  <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-1 md:gap-2 mb-5">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} is3D={false} product={product} />
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
