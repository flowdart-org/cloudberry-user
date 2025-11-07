import { ProductPreviewCategory } from ./category.types";
export  type ProductStatus  = "active" | 'inactive'

export interface Product {
  id: string;
  name: string;
  description: string;
  actualPrice: number;
  variants: VariantsDto[];
  discountPrice: number;
  discountPercent: number;
  categoryId: number;
  status: ProductStatus;
  tryOn: boolean;
  tags?: string[];
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

export interface ProductResponseDto {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    discountPercentage?: number;
    images: Array<string>;
    variants: Array<string>;
    categoryId: string;
    category: object;
    createdAt: string;
    updatedAt: string;
}

export interface ProductDetails {
    id: string;
    name: string;
    description: string;
    price: number;
    discountPrice: number;
    discountPercent: number;
    images: string[];
    variants: VariantsDto[];
    category: ProductPreviewCategory;
    status: ProductStatus;
    tryOn: boolean;
    createdAt: string;
    updatedAt: string;
}
