import { ApiResponse } from "../types";
import { request, userApi } from "@/lib/axios";
import { USER } from "./user.constants";
import { User } from "@/types/user.types";

const BASE_URL = "/user";

// export const USER_SERVICES = {
//   me: async (): Promise<ApiResponse<User>> => {
//     return await request<User>("get", `${BASE_URL}/${USER.ME}`);
//   },

// };

export const USER_SERVICES = {
  me: async (): Promise<ApiResponse<User>> => {
    const response: any = await userApi.userControllerFindMe();
    return response.data;
  },
};
