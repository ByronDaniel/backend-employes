import { Schema, model, type InferSchemaType } from 'mongoose';

const empleadoSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    cargo: { type: String, required: true, trim: true },
    departamento: { type: String, required: true, trim: true },
    sueldo: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type Empleado = InferSchemaType<typeof empleadoSchema> & {
  _id?: string;
};

const EmpleadoModel = model<Empleado>('Empleado', empleadoSchema);

export default EmpleadoModel;
