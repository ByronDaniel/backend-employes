import EmpleadoModel, { type Empleado } from '../models/empleado.js';
import type { CreateEmpleadoDto, UpdateEmpleadoDto } from '../dto/employee.dto.js';
import type { IEmployeeRepository } from './IEmployeeRepository.js';

class MongooseEmployeeRepository implements IEmployeeRepository {

  async findAll(): Promise<Empleado[]> {
    const empleados = await EmpleadoModel.find().lean();
    return empleados as Empleado[];
  }

  async findById(id: string): Promise<Empleado | null> {
    const empleado = await EmpleadoModel.findById(id).lean();
    return empleado as Empleado | null;
  }

  async create(data: CreateEmpleadoDto): Promise<Empleado> {
    const empleado = await EmpleadoModel.create(data);
    return empleado.toObject() as Empleado;
  }

  async update(id: string, data: UpdateEmpleadoDto): Promise<Empleado | null> {
    const empleado = await EmpleadoModel.findByIdAndUpdate(id, data, { new: true }).lean();
    return empleado as Empleado | null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await EmpleadoModel.findByIdAndDelete(id);
    return result !== null;
  }
}

export const employeeRepository: IEmployeeRepository = new MongooseEmployeeRepository();
