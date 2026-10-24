// src/modules/auth/models/user.model.ts
import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  rol: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  rol: { type: String, default: 'alumno' }
}, { timestamps: true });

export const UserModel = model<IUser>('User', UserSchema);
