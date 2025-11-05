export interface Product {
  id: string;
  name: string;
  description: string;
  actualPrice: number;
  variants: VariantDto[];
  discountPrice: number;
  discountPercent: number;
  categoryId: number;
  status: "active" | "inactive";
  tryOn: boolean;
  tags?: string[];
}

export interface VariantDto {
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