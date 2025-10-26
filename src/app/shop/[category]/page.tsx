"use client"
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import { useState } from "react";

const categories = ["ALL", "TROUSERS", "SHIRTS", "JEANS", "T-SHIRTS", "LUXE", "FORMAL WEAR"];

const mockProducts: Product[] = [
  { id: 1, name: "100% Cotton Regular Fit Shirt", price: 1499, image: product1, category: "SHIRTS" },
  { id: 2, name: "Regular Fit Stretch Relaxed Polo T-Shirt", price: 899, image: product2, category: "T-SHIRTS" },
  { id: 3, name: "Regular Fit Stretch Ribbed Polo T-Shirt", price: 899, image: product1, category: "T-SHIRTS" },
  { id: 4, name: "Regular Fit Stretch Ribbed Polo T-Shirt", price: 899, image: product2, category: "T-SHIRTS" },
  { id: 5, name: "100% Cotton Regular Fit Shirt", price: 1499, image: product1, category: "SHIRTS" },
  { id: 6, name: "Regular Fit Stretch Relaxed Polo T-Shirt", price: 899, image: product2, category: "T-SHIRTS" },
  { id: 7, name: "Regular Fit Stretch Ribbed Polo T-Shirt", price: 899, image: product1, category: "T-SHIRTS" },
  { id: 8, name: "Regular Fit Stretch Ribbed Polo T-Shirt", price: 899, image: product2, category: "T-SHIRTS" },
  { id: 9, name: "100% Cotton Regular Fit Shirt", price: 1499, image: product1, category: "SHIRTS" },
  { id: 10, name: "Regular Fit Stretch Relaxed Polo T-Shirt", price: 899, image: product2, category: "T-SHIRTS" },
  { id: 11, name: "Regular Fit Stretch Ribbed Polo T-Shirt", price: 899, image: product1, category: "T-SHIRTS" },
  { id: 12, name: "Regular Fit Stretch Ribbed Polo T-Shirt", price: 899, image: product2, category: "T-SHIRTS" },
];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [sizeOpen, setSizeOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col  ">
      <Header />
      
      <div className="bg-foreground text-background py-2 text-center text-sm">
        Free shipping on order over $100
      </div>

      <main className="flex-1">
        <div className="px-4 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <h1 className="text-3xl font-bold mb-8 text-foreground">TROUSER</h1>
              <div className="mb-6 border-b border-border pb-4">
                <button
                  onClick={() => setSizeOpen(!sizeOpen)}
                  className="flex items-center justify-between w-full text-left font-semibold text-foreground mb-3"
                >
                  SIZE
                  <ChevronDown className={`h-4 w-4 transition-transform ${sizeOpen ? 'rotate-180' : ''}`} />
                </button>
                {sizeOpen && (
                  <div className="space-y-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
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
                  <ChevronDown className={`h-4 w-4 transition-transform ${colorOpen ? 'rotate-180' : ''}`} />
                </button>
                {colorOpen && (
                  <div className="space-y-2">
                    {['Black', 'White', 'Blue', 'Red', 'Gray', 'Beige'].map((color) => (
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
                  <ChevronDown className={`h-4 w-4 transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
                </button>
                {priceOpen && (
                  <div className="space-y-2">
                    {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹1500', 'Over ₹1500'].map((range) => (
                      <label key={range} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-foreground">{range}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Actions */}
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
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-2 mb-8">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {/* <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination> */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
