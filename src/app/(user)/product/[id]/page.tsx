"use client";

import { useEffect, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";
import { PRODUCT_SERVICES } from "@/api/product/product.service";
import { ProductDTO } from "@/types/product.types";
import TryOnModal from "@/components/product/TryOnModal";
import { useAuthStore } from "@/store/useAuthStore";
import AuthModal from "@/components/auth/AuthModal";
import YouMightAlsoLike from "@/components/product/YouMightAlsoLike";


const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore()
  const { toast } = useToast();
  const [product, setProduct] = useState<null | ProductDTO>(null)
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);


  const [selectedImage, setSelectedImage] = useState<number>(-1);
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await PRODUCT_SERVICES.getProduct(id as string)
        console.log(response.data, 'rpoducdta dasafdai data')
        setProduct(response.data ?? null)
        setSelectedVariantId(response.data?.variants[0].id ?? '')
      } catch (error) {
        console.error(error)
      }
    }
    fetchProductDetails()
  }, [])



  const handleAddToBag = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return
    }
    if (!selectedVariantId) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to bag",
        variant: "destructive",
      });
      return;
    }

    if (!product) return null

    const variant = product.variants.find((v) => v.id === selectedVariantId);
    if (!variant) {
      toast({
        title: "Size not available",
        description: "Selected size was not found for this product.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: '',
      product,
      quantity,
      variant: { id: variant.id, size: variant.size, stock: variant.stock },
    });

    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your cart`,
    });

    // Reset quantity after adding
    setQuantity(1);
  };

  const handleTryOnModal = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      return
    }
    setIsTryOnOpen(true)
  }

  if (!product) return null
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
  const stock = selectedVariant?.stock ?? 0;



  return (
    <div className="min-h-screen flex flex-col">
      <Header categories />

      <main className="flex-1">
        <div className="container px-4 md:px-8 py-6">
          {/* Breadcrumb */}
          <div className="text-sm text-neutral-400  mb-6">
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
                  onClick={() => setSelectedImage(-1)}
                  className={cn(
                    "relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                    selectedImage === -1
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  )}
                >
                  <img
                    src={product?.thumbnail}
                    alt={`product thumbnail view`}
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
                      alt={`product view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 bg-muted rounded-lg overflow-hidden aspect-[3/4]">
                <img
                  src={selectedImage === -1 ? product?.thumbnail : product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 0 && <> <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                  onClick={() => setSelectedImage((prev) => (prev <= -1 ? product.images.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => setSelectedImage((prev) => prev < product.images.length - 1 ? prev + 1 : -1)}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button> </>}
              </div>
            </div>

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
                    ₹{product.discountPrice.toFixed(2)}
                  </p>
                </div>

              </div>

              <p
                className={cn(
                  "text-sm font-medium",
                  stock <= 0
                    ? "text-red-400"
                    : stock < 10
                      ? "text-red-400"
                      : "text-black"
                )}
              >
                {selectedVariantId &&
                  (stock <= 0
                    ? "Out of stock"
                    : stock < 10
                      ? `Only ${stock} left`
                      : `In stock (${stock})`)}
              </p>


              {/* Size Selector */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  AVAILABLE SIZE
                </label>
                <div className="flex gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={cn(
                        "w-12 h-12 border-2 text-sm font-medium transition-all",
                        selectedVariantId === variant.id
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
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </Button>

                  <span className="w-12 text-center font-medium">{quantity}</span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(prev => Math.min(prev + 1, stock))}
                    disabled={quantity >= stock}
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
                  disabled={!product?.tryOn}
                  onClick={handleTryOnModal}
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

              {/* product Description */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-2">product Details</h3>
                <p className="text-sm text-neutral-400  leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div> :
            <div>Loading</div>}

          {/* You Might Also Like */}
          {product && <YouMightAlsoLike categoryId={product?.category?.id as string} productId={product?.id as string} />}
        </div>
      </main>

      {product && <TryOnModal
        isOpen={isTryOnOpen}
        onClose={() => setIsTryOnOpen(false)}
        product={product}
      />}

      <AuthModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
