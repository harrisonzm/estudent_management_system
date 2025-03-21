import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { HttpModule } from '@nestjs/axios';
import { Course } from './courses.types';
import { RpcException } from '@nestjs/microservices';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CoursesService],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un estudiante correctamente', () => {
    const courseData: Course = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    const createdCourse: Course = service.createCourse(courseData);
    expect(createdCourse).toMatchObject(courseData);
  });

  it('debería lanzar error si el ID ya existe', async () => {
    const courseData: Course = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    service.createCourse(courseData);
    await expect(service.createCourse(courseData)).rejects.toThrow(
      RpcException,
    );
  });

  it('debería actualizar un estudiante correctamente', () => {
    const courseData: Course = service.createCourse({
      idUser: '123546879',
      idCourse: '00000001',
    });

    const updatedData: Course = service.updateCourse('000000005', {
      idCourse: 'Pedro Modificado',
    });
    expect(updatedData).toBe(Course);
    expect(updatedData.firstName).toBe('Pedro Modificado');
  });

  it('debería lanzar error al intentar actualizar con un campo inválido', async () => {
    const courseData: Course = service.createCourse({
      idUser: '123546879',
      idCourse: '00000001',
    });

    await expect(
      service.updateCourse('000000006', {
        invalidField: 'Valor no permitido',
      } as any),
    ).rejects.toThrow(RpcException);
  });

  it('debería lanzar error al intentar actualizar con un tipo de dato incorrecto', async () => {
    const courseData: Course = service.createCourse({
      idUser: '123546879',
      idCourse: '00000001',
    });

    await expect(
      service.updateCourse('000000007', {
        idCourse: 30 as unknown as Date,
      }),
    ).rejects.toThrow(RpcException);
  });

  it('debería lanzar error si intenta actualizar un estudiante que no existe', async () => {
    await expect(
      service.updateCourse('999999999', { idCourse: 'Nombre Inexistente' }),
    ).rejects.toThrow(RpcException);
  });

  it('debería obtener todos los estudiantes', () => {
    service.createManyCourses([
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
    ]);

    const courses: Course[] = service.getCourses();
    expect(courses).toHaveLength(2);
  });

  it('debería obtener un estudiante por su ID', () => {
    const courseData = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    service.createCourse(courseData);
    const course = service.getCourseById('000000003');
    expect(course).toMatchObject(courseData);
  });

  it('debería lanzar error si el estudiante no existe', async () => {
    await expect(service.getCourseById('999999999')).rejects.toThrow(
      RpcException,
    );
  });
  it('debería eliminar un estudiante por su ID', () => {
    const courseData = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    service.createCourse(courseData);

    service.deleteCourseById('000000004');

    const deletedCourse = service.getCourseById('000000004');

    expect(deletedCourse).toBeNull();
  });

  it('debería lanzar error al intentar eliminar un estudiante que no existe', async () => {
    await expect(service.deleteCourseById('999999999')).rejects.toThrow(
      RpcException,
    );
  });

  it('debería obtener todos los estudiantes', () => {
    const coursesData = [
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
    ];

    // Insertar los estudiantes en la base de datos
    service.createManyCourses(coursesData);

    // Obtener los estudiantes con el servicio
    const courses = service.getCourses();
    expect(courses).toHaveLength(2);

    // Verificar que todos los estudiantes tengan todas las propiedades esperadas
    courses.forEach((course, index) => {
      expect(course).toMatchObject(coursesData[index]);
    });

    // Eliminar los estudiantes creados para limpiar la base de datos
    service.deleteManyCoursesById(coursesData.map((s) => s.id));

    // Verificar que se eliminaron correctamente
    const remainingcourses: Course[] = service.getCourses();
    expect(remainingcourses).toHaveLength(0);
  });
});
