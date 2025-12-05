import { RequestOtpDTO, VerifyOtpDTO } from "./auth.dto";
import { ApiResponse } from "../types";
import { authApi, request } from "@/lib/axios";

export const AUTH_SERVICES = {
  requestOtp: async (payload: RequestOtpDTO): Promise<ApiResponse<void>> => {
    return await request(authApi.authControllerRequestOtp.bind(authApi), payload)
  },

  verifyOtp: async (payload: VerifyOtpDTO): Promise<ApiResponse<void>> => {
    return await request(async (p: VerifyOtpDTO) => {
      const res = await authApi.authControllerVerifyOtp(p);
      return { data: res.data as unknown as ApiResponse<void> };
    }, payload);
  },

  logout: async (): Promise<void> => {
    await authApi.authControllerLogout()
  },

  refreshToken: async (): Promise<void> => {
    await authApi.authControllerRefreshToken();
  },
};
