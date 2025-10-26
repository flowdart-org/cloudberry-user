import axios, { AxiosRequestConfig } from "axios";
import { ApiResponse } from "@/api/types";
import { APP_CONFIG } from "./app.config";

export const api = axios.create({
  baseURL: APP_CONFIG.URLS.API_BASE,
  withCredentials: true,
});

export async function request<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response = await api.request<ApiResponse<T>>({
      url,
      method,
      data,
      ...config,
    });
    console.log('me response, return data:',response.data)
    return response.data;
  } catch (err: any) {
    return {
      message: err?.response?.data?.message || err.message,
      success: false,
    };
  }
}
