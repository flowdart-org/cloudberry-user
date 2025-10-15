"use client"

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/useStore";
import { Product } from "@/store/useStore";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-card overflow-hidden transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 z-10"
        onClick={() => toggleWishlist(product.id)}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors",
            isWishlisted ? "fill-accent text-accent" : "text-foreground"
          )}
        />
      </Button> */}
      
      <Link href={`/product/${product.id}`}>
        <div className="p-1">
          <h3 className="text-sm font-medium text-foreground line-clamp-2">
            {product.name}
          </h3>
          <p className="text-lg font-thin text-foreground">₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
