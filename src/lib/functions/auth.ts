import { AUTH_SERVICES } from "@/api/auth/auth.service";
import { ApiResponse } from "@/api/types";
import { ErrorResponse } from "@/api/utils";
import { validateContact } from "../utils";

export const sendOtp = async (input: string): Promise<ApiResponse> => {
  try {
    const { isValid, identifier } = validateContact(input);
    if (isValid && identifier) {
      return await AUTH_SERVICES.requestOtp({ identifier });
    } else {
      throw new Error("Invalid contact input");
    }
  } catch (error) {
    return ErrorResponse(error);
  }
};

export const verifyOtp = async (
  input: string,
  otp: string
): Promise<ApiResponse> => {
  try {
    if (otp.length !== 4) {
      throw new Error("Please enter a valid 4-digit OTP.");
    }
    const { isValid, identifier } = validateContact(input);
    if (isValid && identifier) {
      return await AUTH_SERVICES.verifyOtp({ identifier, otp });
    } else {
      throw new Error("Invalid contact input");
    }
  } catch (error) {
    return ErrorResponse(error);
  }
};

export const logout = async (): Promise<ApiResponse> => {
  try {
    return await AUTH_SERVICES.logout();
  } catch (error) {
    return ErrorResponse(error);
  }
};

export const refreshToken = async (): Promise<ApiResponse> => {
  try {
    return await AUTH_SERVICES.refreshToken();
  } catch (error) {
    return ErrorResponse(error);
  }
};
