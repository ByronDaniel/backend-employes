// src/shared/middlewares/validate.middleware.ts
import type { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';
import { IApiResponse } from '../interfaces/response.interface.js';

export const validateRequest = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (parsed.body) req.body = parsed.body;
      if (parsed.params) req.params = parsed.params;
      if (parsed.query) req.query = parsed.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues.map((i) => i.message).join(', ');
        const errorResponse: IApiResponse = {
          success: false,
          error: {
            message,
            code: 'VALIDATION_ERROR',
          },
          timestamp: new Date().toISOString(),
        };
        res.status(400).json(errorResponse);
        return;
      }
      next(error);
    }
  };
};
