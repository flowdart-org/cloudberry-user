import { ProductPreviewCategory } from "./category.types";
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
  size: string;
  stock: number;
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
    discountPercentage: number;
    images: string[];
    variants: VariantsDto[];
    category: ProductPreviewCategory;
    status: ProductStatus;
    createdAt: string;
    updatedAt: string;
}
