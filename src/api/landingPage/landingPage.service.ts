import { landingPageApi, request } from "@/lib/axios";
import { ApiResponse } from "../types";
import { LandingPageResponseDto } from "./landingPage.dto";

export const LANDING_PAGE_SERVICES = {
  getLandingPage: async (): Promise<ApiResponse<LandingPageResponseDto>> => {
        return await request(landingPageApi.landingPageControllerGet.bind(landingPageApi)) as ApiResponse<LandingPageResponseDto>
  },
};
