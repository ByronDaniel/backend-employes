// src/config/database.ts
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from '../modules/auth/models/user.model.js';

export const connectDatabase = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/usuarios_db';
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🔄 [Database]: Conexión exitosa a MongoDB');

    // Auto-seed usuario inicial para pruebas si la base está vacía
    const existing = await UserModel.findOne({ email: 'alumno@epn.edu.ec' });
    if (!existing) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      await UserModel.create({
        email: 'alumno@epn.edu.ec',
        password: hashedPassword,
        rol: 'alumno',
      });
      console.log('👤 [Auth Seed]: Usuario de prueba creado (alumno@epn.edu.ec / 123456)');
    }
  } catch (error) {
    console.error('❌ Error crítico al conectar a la base de datos:', error);
    process.exit(1);
  }
};