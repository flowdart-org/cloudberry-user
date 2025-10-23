import { ApiResponse } from "@/api/types";
import { USER_SERVICES } from "@/api/user/user.service";
import { ErrorResponse } from "@/api/utils";
import { User } from "@/types/user.types";

export const me = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await USER_SERVICES.me();
    return response;
  } catch (error) {
    return ErrorResponse(error)
  }
};