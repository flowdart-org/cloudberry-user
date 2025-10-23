"use client"
import { Product } from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
  <div className="group relative bg-card overflow-hidden rounded-none transition-transform duration-500 hover:scale-105">
      {/* Image with overlay */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          {/* product name on image */}
          <h3 className="absolute bottom-3 left-3 right-3 text-center text-white text-sm md:text-base font-medium line-clamp-2 drop-shadow-md">
            {product.name}
          </h3>
        </div>
      </Link>

      {/* Price section */}
      <Link href={`/product/${product.id}`}>
        <div className="p-2 flex justify-center">
          <p className="text-gray-900  text-base md:text-lg tracking-tight">
            ₹{product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
