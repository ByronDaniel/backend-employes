// src/modules/employee/repositories/employee.repository.interface.ts
export interface IEmployeeRepository {
  findAll(): Promise<any>;
  findById(id: string): Promise<any>;
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}
