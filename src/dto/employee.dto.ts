import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { AppError } from '../utils/http-response.js';

export const employeePayloadSchema = z.object({
  nombre: z.string({ required_error: 'nombre es obligatorio' }).trim().min(2, 'nombre debe tener al menos 2 caracteres').max(100),
  cargo: z.string({ required_error: 'cargo es obligatorio' }).trim().min(2, 'cargo debe tener al menos 2 caracteres').max(100),
  departamento: z.string({ required_error: 'departamento es obligatorio' }).trim().min(2, 'departamento debe tener al menos 2 caracteres').max(100),
  sueldo: z.number({ required_error: 'sueldo es obligatorio', invalid_type_error: 'sueldo debe ser un número' }).min(0, 'sueldo no puede ser negativo'),
});

export const createEmpleadoSchema = z.object({
  body: employeePayloadSchema,
});

export const updateEmpleadoSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'id es obligatorio' }).min(1, 'id es obligatorio'),
  }),
  body: employeePayloadSchema.partial(),
});

export const empleadoIdSchema = z.object({
  params: z.object({
    id: z.string({ required_error: 'id es obligatorio' }).min(1, 'id es obligatorio'),
  }),
});

export type CreateEmpleadoDto = z.infer<typeof employeePayloadSchema>;
export type UpdateEmpleadoDto = Partial<CreateEmpleadoDto>;

export const validateRequest = (schema: z.ZodTypeAny) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req);

      if ('body' in parsed && parsed.body) {
        req.body = parsed.body;
      }

      if ('params' in parsed && parsed.params) {
        req.params = parsed.params;
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.issues.map((issue) => issue.message).join(', ');
        next(new AppError(400, message));
        return;
      }

      next(error);
    }
  };
};
