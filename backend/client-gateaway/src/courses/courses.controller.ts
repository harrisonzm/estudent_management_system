import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { COURSES_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateCourse, UpdateCourse } from './courses.types';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject(COURSES_SERVICE) private readonly coursesClient: ClientProxy,
  ) {}

  @Post()
  async createCourse(@Body() createCourse: CreateCourse) {
    console.log('🛠 Enviando datos:', createCourse);
    try {
      return await firstValueFrom<CreateCourse>(
        this.coursesClient.send({ cmd: 'createCourse' }, createCourse),
      );
    } catch (error: unknown) {
      if (error instanceof RpcException) {
        // RpcException tiene un método `.getError()` para obtener detalles
        const errorResponse = error.getError() as {
          message?: string;
          statusCode?: number;
        };
        throw new HttpException(
          errorResponse.message || 'Error desconocido',
          errorResponse.statusCode || 500,
        );
      }

      if (error && typeof error === 'object' && 'statusCode' in error) {
        const err = error as { message: string; statusCode: number };
        throw new HttpException(err.message, err.statusCode);
      }

      throw new InternalServerErrorException(
        'Error en la creación del estudiante',
      );
    }
  }

  @Get()
  findAllCourses() {
    return this.coursesClient.send({ cmd: 'findCourses' }, {});
  }

  @Get(':id')
  findOneCourse(@Param('id') id: string) {
    return this.coursesClient.send({ cmd: 'findOneCourse' }, { id });
  }

  @Patch(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourse: UpdateCourse,
  ) {
    try {
      console.log('ID en la URL:', id);
      console.log('Datos recibidos:', updateCourse);

      // Sobrescribe el ID en el DTO
      const updatedData = { ...updateCourse, id };

      return await firstValueFrom<CreateCourse>(
        this.coursesClient.send({ cmd: 'updateCourse' }, updatedData),
      );
    } catch (error: unknown) {
      if (error instanceof RpcException) {
        const errorResponse = error.getError() as {
          message?: string;
          statusCode?: number;
        };
        throw new HttpException(
          errorResponse.message || 'Error desconocido',
          errorResponse.statusCode || 500,
        );
      }

      if (error && typeof error === 'object' && 'statusCode' in error) {
        const err = error as { message: string; statusCode: number };
        throw new HttpException(err.message, err.statusCode);
      }

      throw new InternalServerErrorException(
        'Error en la actualización del estudiante',
      );
    }
  }

  @Delete(':id')
  removeCourse(@Param('id') id: string) {
    return this.coursesClient.send({ cmd: 'deleteCourse' }, { id });
  }
}
