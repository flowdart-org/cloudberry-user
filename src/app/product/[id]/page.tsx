"use client"
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useStore, Product } from "@/store/useStore";
import { cn } from "@/lib/utils";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import Link from "next/link";
import { useParams } from 'next/navigation';
import Image from "next/image";

const mockProducts: Product[] = [
  { id: 1, name: "100% Cotton Regular Fit Shirt", price: 1499, image: product1, category: "SHIRTS" },
  { id: 2, name: "Regular Fit Stretch Relaxed Polo T-Shirt", price: 899, image: product2, category: "T-SHIRTS" },
  { id: 3, name: "Regular Fit Stretch Ribbed Polo T-Shirt", price: 899, image: product1, category: "T-SHIRTS" },
  { id: 4, name: "Regular Fit Stretch Ribbed Polo T-Shirt", price: 899, image: product2, category: "T-SHIRTS" },
  { id: 5, name: "Stretch Slim Fit Striped Trousers", price: 1299, image: product1, category: "TROUSERS" },
];

const colors = [
  { name: "Beige", hex: "#D4C5B0" },
  { name: "Gray", hex: "#8B8B8B" },
  { name: "Brown", hex: "#8B6F47" },
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#1A2332" },
];

const sizes = ["28", "30", "32", "34", "36"];

const ProductDetails = () => {
  const { id } = useParams();
  const { wishlist, toggleWishlist, addToCart } = useStore();
  
  const product = mockProducts.find((p) => p.id === Number(id)) || mockProducts[4];
  const isWishlisted = wishlist.includes(product.id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const images = [product.image, product2, product1, product.image];

  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToBag = () => {
    addToCart(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className=" px-4 md:px-8 py-6">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-foreground">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === idx
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 bg-muted rounded-lg overflow-hidden aspect-[3/4]">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isWishlisted ? "fill-accent text-accent" : "text-foreground"
                    )}
                  />
                </Button> */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute  top-1/2 -translate-y-1/2 "
                  onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-foreground">₹{product.price}</p>
              </div>

              {/* Color Selector */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  COLOR: <span className="font-normal">{colors[selectedColor].name}</span>
                </label>
                <div className="flex gap-2">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all",
                        selectedColor === idx
                          ? "border-foreground scale-110"
                          : "border-border hover:border-muted-foreground"
                      )}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  AVAILABLE SIZE
                </label>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-12 h-12 rounded border-2 text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  QTY
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 h-12 font-semibold"
                >
                  TRY ON
                </Button>
                <Button
                  variant="default"
                  className="flex-1 h-12 font-semibold"
                  onClick={handleAddToBag}
                >
                  ADD TO BAG
                </Button>
              </div>

              {/* Product Description */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-2">Product Details</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Premium quality {product.category.toLowerCase()} designed for comfort and style. 
                  Made with high-quality materials and expert craftsmanship. Perfect for any occasion.
                </p>
              </div>

              {/* Care Instructions */}
              <div className="pt-4">
                <h3 className="font-semibold text-foreground mb-2">Care Instructions</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Machine wash cold</li>
                  <li>• Do not bleach</li>
                  <li>• Tumble dry low</li>
                  <li>• Iron on low heat</li>
                </ul>
              </div>
            </div>
          </div>

          {/* You Might Also Like */}
          <section className="py-8 border-t border-border">
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
