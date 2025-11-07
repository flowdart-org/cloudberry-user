'use client'

import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "@/store/useProductStore";


const ProductGrid = () => {
  const { products, page, limit, setPage, category, applyFilters } = useProductStore();


  useEffect(() => {
    applyFilters()
  }, [])
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="">
        <h2 className="text-2xl md:text-3xl  text-center mb-2 text-foreground ">
          NEW AND POPULAR
        </h2>
        <div className="h-[3px] w-20 bg-primary mx-auto mb-8" />

        {/* <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="text-xs md:text-sm"
            >
              {category}
            </Button>
          ))}
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-2">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} is3D={true}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
