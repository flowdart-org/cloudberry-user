import { Category } from "@/types/category.types";
import { ProductDTO } from "@/types/product.types";

export interface LandingPageResponseDto {
  hero: {
    image: string;
    title: string;
    subtitle: string;
  };
  topCategories: Array<Category>;
  topProducts: Array<ProductDTO>;
  sections: Array<object>;
}
