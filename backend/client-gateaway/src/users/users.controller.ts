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
import { USERS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUser, UpdateUser } from './users.types';
@Controller('users/student')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly userClient: ClientProxy,
  ) {}

  @Post()
  async createStudent(@Body() createUser: CreateUser) {
    console.log('🛠 Enviando datos:', createUser);
    try {
      return await firstValueFrom<CreateUser>(
        this.userClient.send({ cmd: 'createStudent' }, createUser),
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
  findAllStudents() {
    return this.userClient.send({ cmd: 'findStudents' }, {});
  }

  @Get(':id')
  findOneStudent(@Param('id') id: string) {
    return this.userClient.send({ cmd: 'findOneStudent' }, { id });
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUser) {
    try {
      console.log('ID en la URL:', id);
      console.log('Datos recibidos:', updateUser);

      // Sobrescribe el ID en el DTO
      const updatedData = { ...updateUser, id };

      return await firstValueFrom<CreateUser>(
        this.userClient.send({ cmd: 'updateStudent' }, updatedData),
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
  removeStudent(@Param('id') id: string) {
    return this.userClient.send({ cmd: 'deleteStudent' }, { id });
  }
}
