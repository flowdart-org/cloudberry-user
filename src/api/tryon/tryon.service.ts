// Virtual Try-On API Service

import { request, tryOnApi } from "@/lib/axios";
import { ApiResponse } from "../types";

export interface TryOnRequest {
  productId: string;
  userImage: string;
}

export interface TryOnResponse {
  images: string[];
}

export const TRYON_SERVICES = {
    generateTryOn: async (productId: string):  Promise<ApiResponse<{ images: string[]}>> => {
        return await request(tryOnApi.tryOnControllerTryOn.bind(tryOnApi), {productId}) as ApiResponse<{ images: string[]}>;
    }
};
