import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/http-response.js';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: null,
    });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      data: null,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    data: null,
  });
};
