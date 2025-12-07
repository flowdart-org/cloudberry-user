

export interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    thumbnail?: string;
    category: {
      id: string;
      name: string;
    };
  };
  variant: {
    id: string;
    size: string;
    stock: number;
  };
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
  id?: string;
  name?: string;
}
