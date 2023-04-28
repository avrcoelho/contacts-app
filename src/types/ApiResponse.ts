export type ApiResponse<T> = T & {
  total: number;
  skip: number;
  limit: number;
};
