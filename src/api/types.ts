/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  message: string;
  success: boolean;
  data?: T;
  error?: string;
}

