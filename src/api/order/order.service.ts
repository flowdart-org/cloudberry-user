import { orderApi, request } from "@/lib/axios";
import { ApiResponse, PaginatedResponse } from "../types";
import { OrderResponseDto } from "../client";


export const ORDER_SERVICES = {
   getOrdersByUser: async (): Promise<PaginatedResponse<OrderResponseDto[]>> => {
     return await request(orderApi.orderControllerFindAllByUser.bind(orderApi)) as PaginatedResponse<OrderResponseDto[]>;
    },

    getOrderDetails: async (orderId: string): Promise<ApiResponse<OrderResponseDto>> => {
     return await request(orderApi.orderControllerFindOne.bind(orderApi), orderId) as ApiResponse<OrderResponseDto>;
    },
};
