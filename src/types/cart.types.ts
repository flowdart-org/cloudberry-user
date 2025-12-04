import { ProductDTO } from "./product.types";


export interface CartItem {
    id: string;
    variantId: string;
    quantity: number;
    product: ProductDTO;
    variant: {
      id: string;
      size: string;
      stock: number;
    }
}



export interface CartProductDto {
     id?: string;
  name?: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  category?: CategoryCartItem;
}


export interface CategoryCartItem {
  id?: string
  name?: string;
} 

