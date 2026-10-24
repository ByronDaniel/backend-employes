import type { Empleado } from '../models/empleado.js';
import type { CreateEmpleadoDto, UpdateEmpleadoDto } from '../dto/employee.dto.js';

export interface IEmployeeRepository {
  findAll(): Promise<Empleado[]>;

  findById(id: string): Promise<Empleado | null>;

  create(data: CreateEmpleadoDto): Promise<Empleado>;

  update(id: string, data: UpdateEmpleadoDto): Promise<Empleado | null>;

  delete(id: string): Promise<boolean>;
}
