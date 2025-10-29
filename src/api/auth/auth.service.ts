import { RequestOtpDTO, ResendOtpDTO, VerifyOtpDTO } from "./auth.dto";
import { ApiResponse } from "../types";
import { authApi, request } from "@/lib/axios";
import { AUTH } from "./auth.constants";

// const BASE_URL = "/auth";

// const AUTH_SERVICES = {
//   requestOtp: async (payload: RequestOtpDTO): Promise<ApiResponse<void>> => {
//     return await request<void>(
//       "post",
//       `${BASE_URL}/login/${AUTH.REQUEST_OTP}`,
//       payload
//     );
//   },

//   resendOtp: async (payload: ResendOtpDTO): Promise<ApiResponse<void>> => {
//     return await request<void>(
//       "post",
//       `${BASE_URL}/login/${AUTH.RESEND_OTP}`,
//       payload
//     );
//   },

//   verifyOtp: async (payload: VerifyOtpDTO): Promise<ApiResponse<void>> => {
//     return await request<void>(
//       "post",
//       `${BASE_URL}/login/${AUTH.VERIFY_OTP}`,
//       payload
//     );
//   },

//   logout: async (): Promise<ApiResponse<void>> => {
//     return await request<void>("post", `${BASE_URL}/${AUTH.LOGOUT}`);
//   },

//   refreshToken: async (): Promise<ApiResponse<void>> => {
//     return await request<void>("post", `${BASE_URL}/${AUTH.REFRESH_TOKEN}`);
//   },
// };

export const AUTH_SERVICES = {
  requestOtp: async (payload: RequestOtpDTO): Promise<ApiResponse<void>> => {
    const response: any = await authApi.authControllerRequestOtp(payload);
    return response.data;
  },

  resendOtp: async (payload: ResendOtpDTO): Promise<ApiResponse<void>> => {
    const response: any = await authApi.authControllerResendOtp(payload);
    return response.data;
  },

  verifyOtp: async (payload: VerifyOtpDTO): Promise<ApiResponse<void>> => {
    const response: any = await authApi.authControllerVerifyOtp(payload);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response: any = await authApi.authControllerLogout();
    return response.data;
  },

  refreshToken: async (): Promise<ApiResponse<void>> => {
    const response: any = await authApi.authControllerRefreshToken();
    return response.data;
  },
};
