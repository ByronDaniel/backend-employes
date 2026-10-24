import type { Request, Response, NextFunction } from 'express';
import type { IEmployeeRepository } from '../repositories/employee.repository.interface.js';

export class EmployeeController {
  constructor(private employeeRepository: IEmployeeRepository) {}

  getEmployees = async (_req: Request, res: Response, next?: NextFunction): Promise<void> => {
    try {
      const employees = await this.employeeRepository.findAll();
      res.status(200).json(employees);
    } catch (error) {
      if (next) next(error);
    }
  };

  getEmployeeById = async (req: Request, res: Response, next?: NextFunction): Promise<void> => {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : '';
      const employee = await this.employeeRepository.findById(id);
      if (!employee) {
        res.status(404).json({ success: false, message: 'Empleado no encontrado' });
        return;
      }
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      if (next) next(error);
    }
  };

  createEmployee = async (req: Request, res: Response, next?: NextFunction): Promise<void> => {
    try {
      const employee = await this.employeeRepository.create(req.body);
      res.status(201).json({ success: true, data: employee, message: 'Empleado creado correctamente' });
    } catch (error) {
      if (next) next(error);
    }
  };

  updateEmployee = async (req: Request, res: Response, next?: NextFunction): Promise<void> => {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : '';
      const employee = await this.employeeRepository.update(id, req.body);
      res.status(200).json({ success: true, data: employee });
    } catch (error) {
      if (next) next(error);
    }
  };

  deleteEmployee = async (req: Request, res: Response, next?: NextFunction): Promise<void> => {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : '';
      await this.employeeRepository.delete(id);
      res.status(200).json({ success: true, data: null, message: 'Empleado eliminado correctamente' });
    } catch (error) {
      if (next) next(error);
    }
  };
}
