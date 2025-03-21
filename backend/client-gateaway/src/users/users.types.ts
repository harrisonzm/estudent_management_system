import { Course } from 'src/courses/courses.types';

export interface User {
  nombres_apellidos: string;
  cedula: string;
  departamento_expedicion: string;
  lugar_expedicion: string;
  genero: string;
  etnia: string;
  correo_personal: string;
  correo_institucional: string;
  telefono_movil: string;
  telefono_fijo: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  type: 'student' | 'secretary';
}

export interface CreateUser {
  nombres_apellidos: string;
  cedula: string;
  departamento_expedicion: string;
  lugar_expedicion: string;
  genero: string;
  etnia: string;
  correo_personal: string;
  correo_institucional: string;
  telefono_movil: string;
  telefono_fijo?: string;
}

export interface UpdateUser {
  nombres_apellidos?: string;
  cedula?: string;
  departamento_expedicion?: string;
  lugar_expedicion?: string;
  genero?: string;
  etnia?: string;
  correo_personal?: string;
  correo_institucional?: string;
  telefono_movil?: string;
  telefono_fijo?: string;
}

export interface UserWithCourses {
  user: User;
  courses?: Course[];
}
