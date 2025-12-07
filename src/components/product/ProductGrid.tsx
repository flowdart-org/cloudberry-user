'use client'

import ProductCard from "./ProductCard";
import { ProductDTO } from "@/types/product.types";


const ProductGrid = ({products}: {products: ProductDTO[]}) => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="">
        <h2 className="text-2xl md:text-3xl  text-center mb-2 text-foreground ">
          NEW AND POPULAR
        </h2>
        <div className="h-[3px] w-20 bg-primary mx-auto mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-2">
          {products?.slice(0, 10).map((ProductDTO) => (
            <ProductCard key={ProductDTO.id} product={ProductDTO} is3D={true}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
