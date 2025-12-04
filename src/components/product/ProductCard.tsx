"use client"
import Link from "next/link";
import Image from "next/image";
import { ProductDTO } from "@/types/product.types";


interface ProductCardProps {
  product: ProductDTO;
  is3D: boolean
}

const ProductCard = ({ product, is3D = false }: ProductCardProps) => {
  return (
    <div className={`group relative bg-card overflow-hidden rounded-none transition-transform duration-500
  ${is3D && ' hover:scale-105'}`}>
      {/* Image with overlay */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {(product?.thumbnail || product?.images?.length) &&
            <Image loading="eager" fetchPriority="high"
              src={product?.thumbnail || product?.images[0] || ''}
              alt={product.name}
              width={500}
              height={500}
              className={`w-full h-full object-cover transition-transform duration-500 ${is3D && 'group-hover:scale-110'}`}
            />}
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          {/* product name on image */}
          <h3 className="absolute bottom-3 left-3 right-3 text-cente text-white text-sm md:text-base font-medium line-clamp-2 drop-shadow-md max-w-[200px] transition-all duration-300 group-hover:-translate-y-4 group-hover:scale-105">
            {product.name}
          </h3>
          <h3
            className="absolute bottom-3 left-3 text-white text-xs md:text-[12px]
             font-medium drop-shadow-md w-[200px]
             transition-all duration-300 hidden group-hover:block truncate">
            {product.description}
          </h3>


        </div>
      </Link>

      {/* Price section */}
      <Link href={`/product/${product.id}`}>
        <div className="p-2 flex justify-center gap-4">
          {!is3D && <p className="text-base md:text-lg tracking-tight font-pirulen  line-through flex font-light font-pirulen text-neutral-300">
            ₹{product?.price?.toLocaleString()}
          </p>}
          <p className="text-gray-900  text-base md:text-lg tracking-tight font-pirulen">
            ₹{product.discountPrice.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
