export interface Category {
  id: string
  name: string;
  thumbnail: string;
  products: number;
  status: "active" | "inactive"
}

export type CategoryBarItem = Pick<Category, 'id' | 'name'>;

export type HomeCategory = Pick<Category, 'id' | 'name' | 'thumbnail'>; 

export type ProductPreviewCategory = Pick<Category, 'id' | 'name' | 'status'>;