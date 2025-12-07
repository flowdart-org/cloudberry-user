import { OrderItemDto, VariantDto } from "@/api/client";
import { ProductDTO } from "@/types/product.types";


interface ProductCardProps {
  item: {
      product: ProductDTO;
      variant: VariantDto;
      quantity: number;
  }
}

const ProductMiniCard = ({ item }: ProductCardProps) => {
  return (
    <div className="group flex gap-5 p-5 bg-card rounded-2xl shadow-soft hover:shadow-hover transition-smooth animate-fade-in">
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-muted rounded-xl overflow-hidden flex-shrink-0">
        {item?.product?.thumbnail ? (
          <img 
            src={item?.product?.thumbnail} 
            alt={item?.product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 ">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-base sm:text-lg leading-tight truncate">
          {item?.product?.name}
        </h3>

        <div className="flex items-center gap-3 mt-2 text-sm text-neutral-400 ">
          {/* {item?.product?.size && <span>Size: {item?.product?.size}</span>} */}
          <span>Size: {item?.quantity}</span>
          <span>Qty: {item?.variant?.size}</span>
        </div>

        <p className="text-lg font-semibold mt-3">
          ₹{item?.product?.price?.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductMiniCard;
