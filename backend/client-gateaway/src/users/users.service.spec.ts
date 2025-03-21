import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { HttpModule } from '@nestjs/axios';
import { User } from './users.types';
import { RpcException } from '@nestjs/microservices';

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
  it('debería crear un estudiante correctamente', () => {
    const userData: User = {
      id: '156387456',
      firstName: 'Juan',
      lastName: 'Pérez',
      gender: 'M',
      personalEmail: 'juan@example.com',
      institutionalEmail: 'juan@school.edu',
      birthDate: new Date('2000-01-01'),
      nationality: 'Colombiana',
    };

    const createdStudent: User = service.createStudent(userData);
    expect(createdStudent).toMatchObject(userData);
  });

  it('debería lanzar error si el ID ya existe', async () => {
    const userData: User = {
      id: '156387456',
      firstName: 'Juan',
      lastName: 'Pérez',
      gender: 'M',
      personalEmail: 'juan@example.com',
      institutionalEmail: 'juan@school.edu',
      birthDate: new Date('2000-01-01'),
      nationality: 'Colombiana',
    };

    service.createStudent(userData);
    await expect(service.createStudent(userData)).rejects.toThrow(RpcException);
  });

  it('debería actualizar un estudiante correctamente', () => {
    const userData: User = service.createStudent({
      id: '000000005',
      firstName: 'Pedro',
      lastName: 'González',
      gender: 'M',
      personalEmail: 'pedro@example.com',
      institutionalEmail: 'pedro@school.edu',
      birthDate: new Date('1998-08-08'),
      nationality: 'Colombiana',
    });

    const updatedData: User = service.updateStudent('000000005', {
      firstName: 'Pedro Modificado',
    });
    expect(updatedData).toBe(User);
    expect(updatedData.firstName).toBe('Pedro Modificado');
  });

  it('debería lanzar error al intentar actualizar con un campo inválido', async () => {
    const studentData: User = service.createStudent({
      id: '000000006',
      firstName: 'Elena',
      lastName: 'Rodríguez',
      gender: 'F',
      personalEmail: 'elena@example.com',
      institutionalEmail: 'elena@school.edu',
      birthDate: new Date('2001-02-14'),
      nationality: 'Colombiana',
    });

    await expect(
      service.updateStudent('000000006', {
        invalidField: 'Valor no permitido',
      } as any),
    ).rejects.toThrow(RpcException);
  });

  it('debería lanzar error al intentar actualizar con un tipo de dato incorrecto', async () => {
    const studentData: User = service.createStudent({
      id: '000000007',
      firstName: 'Sofía',
      lastName: 'Fernández',
      gender: 'F',
      personalEmail: 'sofia@example.com',
      institutionalEmail: 'sofia@school.edu',
      birthDate: new Date('1995-06-30'),
      nationality: 'Colombiana',
    });

    await expect(
      service.updateStudent('000000007', {
        birthDate: 'fecha-invalida' as unknown as Date,
      }),
    ).rejects.toThrow(RpcException);
  });

  it('debería lanzar error si intenta actualizar un estudiante que no existe', async () => {
    await expect(
      service.updateStudent('999999999', { firstName: 'Nombre Inexistente' }),
    ).rejects.toThrow(RpcException);
  });

  it('debería obtener todos los estudiantes', () => {
    service.createManyStudents([
      {
        id: '000000001',
        firstName: 'Carlos',
        lastName: 'Gómez',
        gender: 'M',
        personalEmail: 'carlos@example.com',
        institutionalEmail: 'carlos@school.edu',
        birthDate: new Date('1999-05-15'),
        nationality: 'Colombiana',
      },
      {
        id: '000000002',
        firstName: 'Ana',
        lastName: 'Martínez',
        gender: 'F',
        personalEmail: 'ana@example.com',
        institutionalEmail: 'ana@school.edu',
        birthDate: new Date('1998-07-20'),
        nationality: 'Colombiana',
      },
    ]);

    const students: User[] = service.getStudents();
    expect(students).toHaveLength(2);
  });

  it('debería obtener un estudiante por su ID', () => {
    const studentData = {
      id: '000000003',
      firstName: 'Luis',
      lastName: 'Ramírez',
      gender: 'M',
      personalEmail: 'luis@example.com',
      institutionalEmail: 'luis@school.edu',
      birthDate: new Date('1997-11-30'),
      nationality: 'Colombiana',
    };

    service.createStudent(studentData);
    const student = service.getStudentById('000000003');
    expect(student).toMatchObject(studentData);
  });

  it('debería lanzar error si el estudiante no existe', async () => {
    await expect(service.getStudentById('999999999')).rejects.toThrow(
      RpcException,
    );
  });
  it('debería eliminar un estudiante por su ID', () => {
    const studentData = {
      id: '000000004',
      firstName: 'María',
      lastName: 'López',
      gender: 'F',
      personalEmail: 'maria@example.com',
      institutionalEmail: 'maria@school.edu',
      birthDate: new Date('2002-03-25'),
      nationality: 'Colombiana',
    };

    service.createStudent(studentData);

    service.deleteStudentById('000000004');

    const deletedStudent = service.getStudentById('000000004');

    expect(deletedStudent).toBeNull();
  });

  it('debería lanzar error al intentar eliminar un estudiante que no existe', async () => {
    await expect(service.deleteStudentById('999999999')).rejects.toThrow(
      RpcException,
    );
  });

  it('debería obtener todos los estudiantes', () => {
    const studentsData = [
      {
        id: '000000000',
        firstName: 'Juan',
        lastName: 'Pérez',
        gender: 'M',
        personalEmail: 'juan@example.com',
        institutionalEmail: 'juan@school.edu',
        birthDate: new Date('2000-01-01'),
        nationality: 'Colombiana',
      },
      {
        id: '000000001',
        firstName: 'Carlos',
        lastName: 'Gómez',
        gender: 'M',
        personalEmail: 'carlos@example.com',
        institutionalEmail: 'carlos@school.edu',
        birthDate: new Date('1999-05-15'),
        nationality: 'Colombiana',
      },
    ];

    // Insertar los estudiantes en la base de datos
    service.createManyStudents(studentsData);

    // Obtener los estudiantes con el servicio
    const students = service.getStudents();
    expect(students).toHaveLength(2);

    // Verificar que todos los estudiantes tengan todas las propiedades esperadas
    students.forEach((student, index) => {
      expect(student).toMatchObject(studentsData[index]);
    });

    // Eliminar los estudiantes creados para limpiar la base de datos
    service.deleteManyStudentsById(studentsData.map((s) => s.id));

    // Verificar que se eliminaron correctamente
    const remainingStudents: User[] = service.getStudents();
    expect(remainingStudents).toHaveLength(0);
  });
});
