import { ApiResponse } from "../types";
import {  request, userApi } from "@/lib/axios";
import { CreateAddressDto, UpdateAddressDto } from "./address.dto";
import { User } from "@/types/user.types";

export const ADDRESS_SERVICES = {
  createAddress: async (data: CreateAddressDto): Promise<ApiResponse<User>> => {
    console.log(data)
    // const response = await userApi.userControllerCreateAddress(data)
    // console.log(response)
        return await request(userApi.userControllerCreateAddress.bind(userApi), data) as ApiResponse<User>;
  },

  updateAddress: async (id: string, data: UpdateAddressDto): Promise<ApiResponse<User>> => {
      return await request(userApi.userControllerUpdateAddress.bind(userApi), id, data) as ApiResponse<User>;
  },
};
