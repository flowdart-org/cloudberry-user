import axios from "axios";
import {
  AuthApi,
  CartApi,
  CategoryApi,
  Configuration,
  LandingPageApi,
  MediaApi,
  OrderApi,
  PaymentApi,
  ProductApi,
  TryOnApi,
  UserApi,
} from "@/api/client";
import { ApiResponse, PaginatedResponse } from "@/api/types";
import { useAuthStore } from "@/store/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const baseURL = API_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const config = new Configuration({
  basePath: baseURL,
  baseOptions: {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const onTokenRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: () => void) => {
  refreshSubscribers.push(callback);
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          const isRefreshed = await useAuthStore.getState().refreshToken();

          console.log(isRefreshed);
          

          isRefreshing = false;

          if (isRefreshed) {
            onTokenRefreshed();
            return api(originalRequest);
          }
          throw new Error('User is not Authenticated')
        } else {
          return new Promise((resolve) => {
            addRefreshSubscriber(() => {
              resolve(api(originalRequest));
            });
          });
        }
      } catch (refreshError) {
        console.log(refreshError)
        await useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  }
);
/* eslint-disable @typescript-eslint/no-explicit-any */
export async function request<T>(
  callback: (...args: any[]) => Promise<{ data: ApiResponse<T> | PaginatedResponse<T> }>,
  ...props: any[]
): Promise<ApiResponse<T> | PaginatedResponse<T>>  {
  try {
    const response = await callback(...props);
    return response.data;
  } catch (err: any) {
    return {
      success: false,
      message: err?.response?.data?.message || err.message || "Unknown error",
      error: err?.response?.data || err,
      data: undefined
    };
  }
}


export const authApi = new AuthApi(config);
export const categoryApi = new CategoryApi(config, baseURL, api);
export const productApi = new ProductApi(config, baseURL, api);
export const userApi = new UserApi(config, baseURL, api);
export const tryOnApi = new TryOnApi(config, baseURL, api);
export const mediaApi = new MediaApi(config, baseURL, api);
export const cartApi = new CartApi(config, baseURL, api);
export const paymentApi = new PaymentApi(config, baseURL, api);
export const landingPageApi = new LandingPageApi(config, baseURL, api);
export const orderApi = new OrderApi(config, baseURL, api);
