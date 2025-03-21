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
  Query,
} from '@nestjs/common';
import { INSCRIPTION_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Inscription, UpdateInscription } from './inscriptions.types';

@Controller('/courses/inscriptions')
export class InscriptionsController {
  constructor(
    @Inject(INSCRIPTION_SERVICE)
    private readonly inscriptionClient: ClientProxy,
  ) {}
  @Post()
  async createInscription(@Body() inscription: Inscription) {
    console.log('🛠 Enviando datos:', inscription);
    try {
      return await firstValueFrom<Inscription>(
        this.inscriptionClient.send({ cmd: 'createStudent' }, inscription),
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
  findInscriptionsByUser() {
    return this.inscriptionClient.send({ cmd: 'findInscriptionByUser' }, {});
  }

  @Get()
  findInscriptionsByCourse() {
    return this.inscriptionClient.send({ cmd: 'findInscriptionByCourse' }, {});
  }

  @Get(':id')
  findOneInscription(@Param('id') id: string) {
    return this.inscriptionClient.send({ cmd: 'findOneInscription' }, { id });
  }

  @Patch(':id')
  async updateInscription(
    @Param('id') id: string,
    @Query('course') course: string,
    @Body() updateInscription: UpdateInscription,
  ) {
    try {
      console.log('ID en la URL:', id);
      console.log('Datos recibidos:', updateInscription);

      // Sobrescribe el ID en el DTO
      const updatedData = { ...updateInscription, id };

      return await firstValueFrom<Inscription>(
        this.inscriptionClient.send({ cmd: 'updateInscription' }, updatedData),
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
    return this.inscriptionClient.send({ cmd: 'deleteStudent' }, { id });
  }
}
