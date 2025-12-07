export type ProductStatus = "active" | "inactive";

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  actualPrice: number;
  variants: VariantsDto[];
  discountPrice: number;
  discountPercent: number;
  categoryId: string;
  status: ProductStatus;
  tryOn: boolean;
  tags?: string[];
  price: number;
  thumbnail?: string;
  images: Array<string>;
  category: {id: string, name: string};
  createdAt: string;
  updatedAt: string;
}

export interface VariantsDto {
  id: string;
  productId: string;
  size: string;
  stock: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

