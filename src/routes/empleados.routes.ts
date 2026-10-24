import { Router } from 'express';
import {
  addEmpleado,
  deleteEmpleado,
  getEmpleadoById,
  getEmpleados,
  updateEmpleado,
} from '../controllers/empleados.controllers.js';
import {
  createEmpleadoSchema,
  empleadoIdSchema,
  updateEmpleadoSchema,
  validateRequest,
} from '../dto/employee.dto.js';
import { authenticateJWT } from '../shared/middlewares/auth.middleware.js';

const router = Router();

// Rutas de empleados (abiertas para GET, protegidas con JWT para mutaciones)
router.get('/empleados', getEmpleados);
router.get('/empleados/:id', validateRequest(empleadoIdSchema), getEmpleadoById);
router.post('/empleados', authenticateJWT, validateRequest(createEmpleadoSchema), addEmpleado);
router.put('/empleados/:id', authenticateJWT, validateRequest(updateEmpleadoSchema), updateEmpleado);
router.delete('/empleados/:id', authenticateJWT, validateRequest(empleadoIdSchema), deleteEmpleado);

// Alias para compatibilidad con la guía (/employees)
router.get('/employees', getEmpleados);
router.get('/employees/:id', validateRequest(empleadoIdSchema), getEmpleadoById);
router.post('/employees', authenticateJWT, validateRequest(createEmpleadoSchema), addEmpleado);
router.put('/employees/:id', authenticateJWT, validateRequest(updateEmpleadoSchema), updateEmpleado);
router.delete('/employees/:id', authenticateJWT, validateRequest(empleadoIdSchema), deleteEmpleado);

export default router;