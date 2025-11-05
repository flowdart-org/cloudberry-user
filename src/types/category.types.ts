export interface Category {
  id: string
  name: string;
  thumbnail: string;
  products: number;
  status: "active" | "inactive"
}
