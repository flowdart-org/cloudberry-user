import { ApiResponse } from "../types";
import { request, userApi } from "@/lib/axios";
import { User } from "@/types/user.types";
import { UpdateUserDto } from "./user.dto";

export const USER_SERVICES = {
   me: async (): Promise<ApiResponse<User>> => {
    return await request(userApi.userControllerMe.bind(userApi)) as ApiResponse<User>
  },

  updateProfile: async (data: UpdateUserDto): Promise<ApiResponse<User>> => {
     return await request(userApi.userControllerUpdate.bind(userApi), data) as ApiResponse<User>
  },
};
