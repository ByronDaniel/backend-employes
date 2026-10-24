import type { NextFunction, Request, Response } from 'express';
import { employeeRepository } from '../repositories/employee.repository.js';
import { AppError, successResponse } from '../utils/http-response.js';

export const getEmpleados = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const empleados = await employeeRepository.findAll();
    res
      .status(200)
      .json(successResponse(empleados, 'Empleados obtenidos correctamente'));
  } catch (error) {
    next(error);
  }
};

export const getEmpleadoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const empleado = await employeeRepository.findById(id);

    if (!empleado) throw new AppError(404, 'Empleado no encontrado');

    res
      .status(200)
      .json(successResponse(empleado, 'Empleado encontrado correctamente'));
  } catch (error) {
    next(error);
  }
};

export const addEmpleado = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const empleado = await employeeRepository.create(req.body);
    res
      .status(201)
      .json(successResponse(empleado, 'Empleado creado correctamente'));
  } catch (error) {
    next(error);
  }
};

export const updateEmpleado = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const empleado = await employeeRepository.update(id, req.body);

    if (!empleado) throw new AppError(404, 'Empleado no encontrado para actualizar');

    res
      .status(200)
      .json(successResponse(empleado, 'Empleado actualizado correctamente'));
  } catch (error) {
    next(error);
  }
};

export const deleteEmpleado = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await employeeRepository.delete(id);

    if (!deleted) throw new AppError(404, 'Empleado no encontrado para eliminar');

    res
      .status(200)
      .json(successResponse(null, 'Empleado eliminado correctamente'));
  } catch (error) {
    next(error);
  }
};
