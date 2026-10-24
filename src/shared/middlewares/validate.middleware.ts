// src/shared/middlewares/validate.middleware.ts
import type { Request, Response, NextFunction } from 'express';
import type { ZodTypeAny } from 'zod';
import { ZodError } from 'zod';
import type { IApiResponse } from '../interfaces/response.interface.js';

export const validateRequest = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed: any = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (parsed && typeof parsed === 'object') {
        if ('body' in parsed && parsed.body) req.body = parsed.body;
        if ('params' in parsed && parsed.params) req.params = parsed.params;
        if ('query' in parsed && parsed.query) req.query = parsed.query;
      }

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
