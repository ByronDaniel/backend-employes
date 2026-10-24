import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import empleadoRoutes from './routes/empleados.routes.js';
import authRoutes from './modules/auth/routes/auth.routes.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

app.set('puerto', Number(process.env.PORT ?? 3000));
app.set('nombreApp', 'Gestión de empleados');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Registro ordenado de módulos independientes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', empleadoRoutes);

app.use(errorHandler);

export default app;