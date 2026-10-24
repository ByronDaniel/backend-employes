// src/shared/middlewares/auth.middleware.ts
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { IApiResponse } from '../interfaces/response.interface.js';

// Extender los tipos de Express para admitir los datos del usuario autenticado
export interface IAuthRequest extends Request {
  user?: { id: string; rol: string };
}

export const authenticateJWT = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const SECRET_KEY = process.env.JWT_SECRET || 'UnAHeXAdEcImAL_o_FrAsE_UlTrA_SeCrEtA_Y_LaRgA_2026';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const errorResponse: IApiResponse = {
      success: false,
      error: {
        message: 'Acceso denegado: No se proporcionó un token de autenticación válido',
        code: 'UNAUTHORIZED'
      },
      timestamp: new Date().toISOString()
    };
    res.status(401).json(errorResponse);
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    const errorResponse: IApiResponse = {
      success: false,
      error: {
        message: 'Acceso denegado: No se proporcionó un token de autenticación válido',
        code: 'UNAUTHORIZED'
      },
      timestamp: new Date().toISOString()
    };
    res.status(401).json(errorResponse);
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as unknown as { id: string; rol: string };
    req.user = decoded; // Inyección de contexto seguro
    return next();
  } catch (error) {
    const invalidResponse: IApiResponse = {
      success: false,
      error: {
        message: 'El token proporcionado ha expirado o su firma es inválida',
        code: 'FORBIDDEN'
      },
      timestamp: new Date().toISOString()
    };
    res.status(403).json(invalidResponse);
  }
};
