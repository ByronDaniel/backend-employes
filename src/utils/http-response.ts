export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
  }
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export const successResponse = <T>(data: T, message = 'Operación exitosa'): ApiResponse<T> => ({
  success: true,
  data,
  message,
});
