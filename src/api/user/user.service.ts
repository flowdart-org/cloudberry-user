import { ApiResponse } from "../types";
import { request, userApi } from "@/lib/axios";
import { User } from "@/types/user.types";

export const USER_SERVICES = {
   me: async (): Promise<ApiResponse<User>> => {
    return await request(userApi.userControllerMe.bind(userApi));
  },
};
