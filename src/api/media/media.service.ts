import { ApiResponse } from "../types";
import { api, mediaApi, request } from "@/lib/axios";

export const MEDIA_SERVICES = {
  getUserTryOnUploadUrl: async (file: File): Promise<ApiResponse<{uploadUrl: string, readUrl: string}> | undefined> => {
        return await request(mediaApi.mediaControllerGetUserTryOnUploadUrl.bind(mediaApi) ,file.type) as ApiResponse<{uploadUrl: string, readUrl: string}>;
  },

  uploadImage: async (url: string, image: File): Promise<ApiResponse<void>> => {
    return await api.put(url, image, { headers: { 'x-ms-blob-type': "BlockBlob"}})
  },

  removeTryOnImage: async (): Promise<void> => {
    await mediaApi.mediaControllerRemoveUserTryOnImages();
  }

};
