import { AUTH_SERVICES } from "@/api/auth/auth.service";
import { ApiResponse } from "@/api/types";
import { ErrorResponse } from "@/api/utils";

export const sendOtp = async (phone: string): Promise<ApiResponse> => {
  try {
    console.log("Sending OTP to phone:", phone);
    const response = await AUTH_SERVICES.requestOtp({ phone });
    return response;
  } catch (error) {
    return ErrorResponse(error)
  }
};

export const verifyOtp = async (phone: string, otp: string): Promise<ApiResponse> => {
  try {
    console.log(`Verify OTP of ${phone}: ${otp}`);
    const response = await AUTH_SERVICES.verifyOtp({ phone, otp });
    return response;
  } catch (error) {
    return ErrorResponse(error)
  }
};



