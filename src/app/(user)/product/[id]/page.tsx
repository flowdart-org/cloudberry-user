"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";
import { PRODUCT_SERVICES } from "@/api/product/product.service";
import { ProductDetails } from "@/types/product.types";

const colors = [
  { name: "Beige", hex: "#D4C5B0" },
  { name: "Gray", hex: "#8B8B8B" },
  { name: "Brown", hex: "#8B6F47" },
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#1A2332" },
];

const sizes = ["28", "30", "32", "34", "36"];

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useStore();
  const { toast } = useToast();
  const [product, setProduct] = useState<null | ProductDetails>(null)


  const [selectedImage, setSelectedImage] = useState<null | number>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails()
  }, [])

  async function fetchProductDetails() {
    try {
      const response = await PRODUCT_SERVICES.getProduct(id as string)
      console.log(response)
      setProduct(response.data ?? null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to bag",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      productId: product.id,
      product: product,
      quantity: quantity,
      size: selectedSize,
      color: colors[selectedColor].name,
    });

    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your cart`,
    });

    // Reset quantity after adding
    setQuantity(1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header categories />
{/* 
      <div className="flex justify-center items-center h-screen">
        <Button onClick={() => setOpen(true)}>Open Try-On</Button>
        <TryOnModal isOpen={open} setOpen={setOpen} image={images[0]} />
      </div> */}

      <main className="flex-1">
        <div className="container px-4 md:px-8 py-6">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop/all" className="hover:text-foreground">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product?.name}</span>
          </div>

          {product ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                <button
                    key={'thumbnail'}
                    onClick={() => setSelectedImage(null)}
                    className={cn(
                      "relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === null
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    )}
                  >
                    <img
                      src={product?.thumbnail}
                      alt={`Product thumbnail view`}
                      className="w-full h-full object-cover"
                    />
                  </button>

                {product.images.map((img, idx) => (
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
                    <img
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 bg-muted rounded-lg overflow-hidden aspect-[3/4]">
                <img
                  src={selectedImage === null ? product?.thumbnail : product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                  onClick={() => setSelectedImage((prev) => (prev || -1 > 0 ? prev || - 1 : product.images.length - 1))}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                  onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-light text-foreground mb-2">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3">
                  <div className="flex text-2xl md:text-3xl font-light font-pirulen text-neutral-300">
                    <p>₹</p>
                    <p className=" line-through">
                      {product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Discounted Price */}
                  <p className="text-3xl md:text-4xl font-pirulen font- text-accent">
                    ₹{((product.price/100) * (100-product.discountPercent)).toFixed(2)}
                  </p>
                </div>

              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  AVAILABLE SIZE
                </label>
                <div className="flex gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedSize(variant.size)}
                      className={cn(
                        "w-12 h-12 border-2 text-sm font-medium transition-all",
                        selectedSize === variant.size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      )}
                    >
                      {variant.size}
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
              <div className="flex gap-3 pt-4 ">
                <Button
                  variant={product?.tryOn ? 'default' : 'disabled'}
                  className="flex-1 h-12 font-semibold font-pirulen"

                  // onClick={() => setOpen(true)}
                >
                  TRY ON
                </Button>
                <Button
                  variant="default"
                  className="flex-1 h-12 font-semibold font-pirulen"
                  onClick={handleAddToBag}
                >
                  ADD TO BAG
                </Button>
              </div>

              {/* Product Description */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-2">Product Details</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div> :
          <div>Loading</div> }

          {/* You Might Also Like */}
          <section className="py-8 border-t border-border">
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
              You might also like
            </h2>
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div> */}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
