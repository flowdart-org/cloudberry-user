import {
  RequestOtpDTO,
  ResendOtpDTO,
  VerifyOtpDTO,
} from "./auth.dto";
import { ApiResponse } from "../types";
import { request } from "@/lib/axios";
import { AUTH } from "./auth.constants";

const BASE_URL = '/auth';

export const AUTH_SERVICES = {
  requestOtp: async (payload: RequestOtpDTO): Promise<ApiResponse<void>> => {
    return await request<void>("post", `${BASE_URL}/login/${AUTH.REQUEST_OTP}`, payload);
  },

  resendOtp: async (payload: ResendOtpDTO): Promise<ApiResponse<void>> => {
    return await request<void>("post", `${BASE_URL}/login/${AUTH.RESEND_OTP}`, payload);
  },

  verifyOtp: async (payload: VerifyOtpDTO): Promise<ApiResponse<void>> => {
    return await request<void>("post", `${BASE_URL}/login/${AUTH.VERIFY_OTP}`, payload);
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return await request<void>("post", `${BASE_URL}/${AUTH.LOGOUT}`);
  },

  refreshToken: async (): Promise<ApiResponse<void>> => {
    return await request<void>("post", `${BASE_URL}/${AUTH.REFRESH_TOKEN}`);
  },

};
 