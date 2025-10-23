import {
  RequestOtpDTO,
  ResendOtpDTO,
  VerifyOtpDTO,
} from "./auth.dto";
import { ApiResponse } from "../types";
import { request } from "@/lib/axios";
import { AUTH } from "./auth.constants";

const BASE_URL = '/auth/login';

export const AUTH_SERVICES = {
  requestOtp: async (payload: RequestOtpDTO): Promise<ApiResponse<void>> => {
    return await request<void>("post", `${BASE_URL}/${AUTH.REQUEST_OTP}`, payload);
  },

  resendOtp: async (payload: ResendOtpDTO): Promise<ApiResponse<void>> => {
    return await request<void>("post", `${BASE_URL}/${AUTH.RESEND_OTP}`, payload);
  },

  verifyOtp: async (payload: VerifyOtpDTO): Promise<ApiResponse<void>> => {
    return await request<void>("post", `${BASE_URL}/${AUTH.VERIFY_OTP}`, payload);
  },

  me: async (): Promise<ApiResponse<void>> => {
    return await request<void>("get", `${BASE_URL}/${AUTH.VERIFY_OTP}`);
  },

};
