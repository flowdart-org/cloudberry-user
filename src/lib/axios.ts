import axios, { AxiosRequestConfig } from "axios";
import { AuthApi, CategoryApi, Configuration, ProductApi, TryOnApi, UserApi } from "@/api";
import { APP_CONFIG } from "./app.config";
import { ApiResponse } from "@/api/types";

export const api = axios.create({
  baseURL: APP_CONFIG.URLS.API_BASE,
  withCredentials: true,
});

const basePath = process.env.NEXT_PUBLIC_API_BASE_URL;

export const config = new Configuration({
  basePath,
  baseOptions: {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  },
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
    return response.data;
  } catch (err: any) {
    return {
      message: err?.response?.data?.message || err.message,
      success: false,
    };
  }
}

export const authApi = new AuthApi(config)
export const categoryApi = new CategoryApi(config)
export const productApi = new ProductApi(config)
export const userApi = new UserApi(config)
export const tryOnApi = new TryOnApi(config)
