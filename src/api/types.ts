
export interface PaginatedResponse<T> {
  message: string;
  success: boolean;
  data?: T;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  message: string;
  success: boolean;
  data?: T;
  error?: string;
}
