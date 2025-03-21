import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User, CreateUser, UserWithCourses } from './users.types'; // Ajusta la ruta según tu proyecto
import { Course } from 'src/courses/courses.types';
import { HttpModule } from '@nestjs/axios';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createStudent', () => {
    it('should create and return a User', () => {
      const payload: CreateUser = {
        nombres_apellidos: 'Juan Pérez',
        cedula: '12345678',
        departamento_expedicion: 'Antioquia',
        lugar_expedicion: 'Medellín',
        genero: 'M',
        etnia: 'Mestizo',
        correo_personal: 'juan@example.com',
        correo_institucional: 'juan@uni.edu',
        telefono_movil: '3001234567',
      };

      const result = service.createStudent(payload);

      // Verificar que devuelva algo
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(User);
      // Verificar que sea del tipo User
      expect(result).toHaveProperty('type');
      expect(result.type).toBe('student');

      // Verificar propiedades básicas
      expect(result).toEqual(
        expect.objectContaining({
          nombres_apellidos: payload.nombres_apellidos,
          cedula: payload.cedula,
          correo_personal: payload.correo_personal,
        }),
      );

      // Verificar que las fechas sean instancias de Date
      expect(result.fecha_creacion).toBeInstanceOf(Date);
      expect(result.fecha_actualizacion).toBeInstanceOf(Date);
    });
  });

  describe('getStudents', () => {
    it('should return an array of Users', () => {
      const result = service.getStudents();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        const student = result[0];
        expect(student).toBeInstanceOf(User);
        expect(student).toHaveProperty('cedula');
        expect(student.type).toBe('student');
      }
    });
  });

  describe('getStudentById', () => {
    it('should return a UserWithCourses object', () => {
      const id = '12345678';
      const result = service.getStudentById(id);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(User);
      // Verificar que el objeto tenga la estructura de UserWithCourses
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('cedula');
      expect(result.type).toBe('student');

      // Verificar que courses sea un array si existe
      // if (result.courses) {
      //   expect(Array.isArray(result.courses)).toBe(true);

      //   // Verificar que cada course tenga id, name y limit
      //   result.courses.forEach((course: Course) => {
      //     expect(course).toHaveProperty('id');
      //     expect(course).toHaveProperty('name');
      //     expect(course).toHaveProperty('limit');
      //   });
      // }
    });
  });
});
