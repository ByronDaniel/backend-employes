// src/modules/auth/routes/auth.routes.ts
import { Router } from 'express';
import { MongoAuthRepository } from '../repositories/mongo-auth.repository.js';
import { AuthController } from '../controllers/auth.controller.js';
import { validateRequest } from '../../../shared/middlewares/validate.middleware.js';
import { LoginSchema, RegisterSchema } from '../dtos/auth.dto.js';

const router = Router();
const authRepository = new MongoAuthRepository();
const authController = new AuthController(authRepository);

// Endpoint de login blindado perimetralmente con el DTO de Zod
router.post('/login', validateRequest(LoginSchema), authController.login);
router.post('/register', validateRequest(RegisterSchema), authController.register);

export default router;
