import { ApiResponse } from "../types";
import { api, mediaApi } from "@/lib/axios";

export const MEDIA_SERVICES = {
  getUserTryOnUploadUrl: async (file: File): Promise<ApiResponse<string>> => {
        const response: any = await mediaApi.mediaControllerGetUserTryOnUploadUrl(file.type);
        return response.data;
  },

  uploadImage: async (url: string, image: File): Promise<ApiResponse<void>> => {
    return await api.put(url, image, { headers: { 'x-ms-blob-type': "BlockBlob"}})
  },
};
