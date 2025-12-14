import { ProductDTO } from "@/types/product.types";
import { VariantDto } from "../client";

export interface OrderItemDto {
      product: ProductDTO;
      variant: VariantDto;
      quantity: number;
  }

  export interface OrderResponseDto {
      id: string;
      orderNumber: string;
      customer: {
    id?: string;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
};
      placedAt: string | null;
      updatedAt: string | null;
      deliveredAt: string | null;
      cancelledAt: string | null;
      subtotal: number;
      shippingAddress: {
            city: string,
            state: string,
            street: string,
            country: string,
            houseNo: string,
            pincode: number
        }
      shippingCharge: number;
      discount: number;
      total: number;
      items: Array<OrderItemDto>;
      paymentMethod?: object | null;
      paymentStatus: string;
      orderStatus: string;
      isDeleted: boolean;
  }