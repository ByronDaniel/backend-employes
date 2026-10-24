// src/modules/auth/repositories/mongo-auth.repository.ts
import { IAuthRepository } from './auth.repository.interface.js';
import { UserModel } from '../models/user.model.js';

export class MongoAuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<any | null> {
    return await UserModel.findOne({ email });
  }

  async createUser(userData: any): Promise<any> {
    const newUser = new UserModel(userData);
    return await newUser.save();
  }
}
