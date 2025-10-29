'use client'

import ProductCard from "./ProductCard";
import { Product } from "@/store/useStore";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";

const categories = ["ALL", "TROUSERS", "SHORTS", "JEANS", "T-SHIRTS", "LUXE", "FORMAL WEAR"];

const mockProducts: Product[] = [
  { id: 1, name: "Regular Fit Shirt", price: 1499, image: product1, category: "SHIRTS" },
  { id: 2, name: "Relaxed Polo", price: 999, image: product2, category: "T-SHIRTS" },
  { id: 3, name: "Relaxed Polo", price: 1299, image: product1, category: "SHIRTS" },
  { id: 4, name: "Relaxed Polo", price: 899, image: product2, category: "T-SHIRTS" },
  { id: 5, name: "Washed Baggy Jeans", price: 1799, image: product1, category: "JEANS" },
  { id: 6, name: "Regular Fit Shirt", price: 1499, image: product2, category: "SHIRTS" },
  { id: 7, name: "Relaxed Polo", price: 999, image: product1, category: "T-SHIRTS" },
  { id: 8, name: "Relaxed Polo", price: 1299, image: product2, category: "SHIRTS" },
  { id: 9, name: "Relaxed Polo", price: 899, image: product1, category: "T-SHIRTS" },
  { id: 10, name: "Washed Baggy Jeans", price: 1799, image: product2, category: "JEANS" },
];

const ProductGrid = () => {


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
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
