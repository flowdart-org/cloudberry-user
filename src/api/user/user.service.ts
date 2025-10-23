import { ApiResponse } from "../types";
import { request } from "@/lib/axios";
import { USER } from "./user.constants";
import { User } from "@/types/user.types";

const BASE_URL = '/user';

export const USER_SERVICES = {
  me: async (): Promise<ApiResponse<User>> => {
    return await request<User>("get", `${BASE_URL}/${USER.ME}`);
  },

};
