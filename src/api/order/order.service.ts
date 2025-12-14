import { orderApi, request } from "@/lib/axios";
import { ApiResponse, PaginatedResponse } from "../types";
import { OrderResponseDto } from "./order.dto";


export const ORDER_SERVICES = {
   getOrdersByUser: async (): Promise<PaginatedResponse<OrderResponseDto[]>> => {
     return await request(orderApi.orderControllerFindAllByUser.bind(orderApi)) as PaginatedResponse<OrderResponseDto[]>;
    },

    getOrderDetails: async (orderId: string): Promise<ApiResponse<OrderResponseDto>> => {
     return await request(orderApi.orderControllerFindOne.bind(orderApi), orderId) as ApiResponse<OrderResponseDto>;
    },

    cancelOrder: async (orderId: string): Promise<ApiResponse<OrderResponseDto>> => {
     return await request(orderApi.orderControllerCancelOrder.bind(orderApi), orderId, {reason: ''}) as ApiResponse<OrderResponseDto>;
    },
    
      requestReturn: async (orderId: string): Promise<ApiResponse<OrderResponseDto>> => {
     return await request(orderApi.orderControllerRequestReturn.bind(orderApi), orderId, {reason: ''}) as ApiResponse<OrderResponseDto>;
    },
    
};
