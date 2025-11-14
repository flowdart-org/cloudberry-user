import { ApiResponse } from "../types";
import { userApi } from "@/lib/axios";
import { User } from "@/types/user.types";
import { UpdateUserDto } from "../client";

export const USER_SERVICES = {
   me: async (): Promise<ApiResponse<User>> => {
    const respnose = await userApi.userControllerMe()
    return respnose.data
  },

  updateProfile: async (data: UpdateUserDto): Promise<ApiResponse<User>> => {
    const response = await userApi.userControllerUpdate(data);
    return response.data;
  },
};
