import { RequestOtpDTO, VerifyOtpDTO } from "./auth.dto";
import { ApiResponse } from "../types";
import { authApi, request } from "@/lib/axios";

export const AUTH_SERVICES = {
  requestOtp: async (payload: RequestOtpDTO): Promise<ApiResponse<void>> => {
    return await request(authApi.authControllerRequestOtp.bind(authApi), payload)
  },
  
  verifyOtp: async (payload: VerifyOtpDTO): Promise<ApiResponse<void>> => {
    return await request(authApi.authControllerVerifyOtp.bind(authApi), payload);
  },

  logout: async (): Promise<ApiResponse<void>> => {
   return await request(authApi.authControllerLogout.bind(authApi))
  },

  refreshToken: async (): Promise<ApiResponse<void>> => {
    return await request(authApi.authControllerRefreshToken.bind(authApi));
  },
};
