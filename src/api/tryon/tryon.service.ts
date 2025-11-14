// Virtual Try-On API Service

import { tryOnApi } from "@/lib/axios";
import { ApiResponse } from "../types";

export interface TryOnRequest {
  productId: string;
  userImage: string;
}

export interface TryOnResponse {
  images: string[];
}

export const TRYON_SERVICES = {
  generateTryOnsdf: async (productId: string): Promise<TryOnResponse> => {
    // This is a mock implementation
    // In production, this would call: POST /api/tryon/:productId
    // Backend will:
    // 1. Get user ID from auth token
    // 2. Fetch user's try-on image from database
    // 3. Fetch product image by productId
    // 4. Call Vertex AI API with both images
    // 5. Return array of generated images
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock response with placeholder images
        resolve({
          images: [
            "/placeholder.svg?height=600&width=400&text=Generated+1",
            "/placeholder.svg?height=600&width=400&text=Generated+2",
            "/placeholder.svg?height=600&width=400&text=Generated+3",
          ],
        });
      }, 2000);
    });
  },


    generateTryOn: async (productId: string):  Promise<ApiResponse<string[]>> => {
        const response = await tryOnApi.tryOnControllerTryOn({productId});
        return response.data;
    }
};
