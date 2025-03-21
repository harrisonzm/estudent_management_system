import { Test, TestingModule } from '@nestjs/testing';
import { InscriptionsService } from './inscriptions.service';
import { HttpModule } from '@nestjs/axios';
import { RpcException } from '@nestjs/microservices';
import { Inscription } from './inscriptions.types';

describe('InscriptionsService', () => {
  let service: InscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [InscriptionsService],
    }).compile();

    service = module.get<InscriptionsService>(InscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('debería crear un estudiante correctamente', () => {
    const inscriptionData: Inscription = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    const createdInscription: Inscription =
      service.createInscription(inscriptionData);
    expect(createdInscription).toMatchObject(inscriptionData);
  });

  it('debería lanzar error si el ID ya existe', async () => {
    const inscriptionData: Inscription = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    service.createInscription(inscriptionData);
    await expect(service.createInscription(inscriptionData)).rejects.toThrow(
      RpcException,
    );
  });

  it('debería actualizar un estudiante correctamente', () => {
    const inscriptionData: Inscription = service.createInscription({
      idUser: '123546879',
      idCourse: '00000001',
    });

    const updatedData: Inscription = service.updateInscription('000000005', {
      idCourse: 'Pedro Modificado',
    });
    expect(updatedData).toBe(Inscription);
    expect(updatedData.firstName).toBe('Pedro Modificado');
  });

  it('debería lanzar error al intentar actualizar con un campo inválido', async () => {
    const inscriptionData: Inscription = service.createInscription({
      idUser: '123546879',
      idCourse: '00000001',
    });

    await expect(
      service.updateInscription('000000006', {
        invalidField: 'Valor no permitido',
      } as any),
    ).rejects.toThrow(RpcException);
  });

  it('debería lanzar error al intentar actualizar con un tipo de dato incorrecto', async () => {
    const inscriptionData: Inscription = service.createInscription({
      idUser: '123546879',
      idCourse: '00000001',
    });

    await expect(
      service.updateInscription('000000007', {
        idCourse: 30 as unknown as Date,
      }),
    ).rejects.toThrow(RpcException);
  });

  it('debería lanzar error si intenta actualizar un estudiante que no existe', async () => {
    await expect(
      service.updateInscription('999999999', { idCourse: 'Nombre Inexistente' }),
    ).rejects.toThrow(RpcException);
  });

  it('debería obtener todos los estudiantes', () => {
    service.createManyInscriptions([
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
    ]);

    const inscriptions: Inscription[] = service.getInscriptions();
    expect(inscriptions).toHaveLength(2);
  });

  it('debería obtener un estudiante por su ID', () => {
    const inscriptionData = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    service.createInscription(inscriptionData);
    const inscription = service.getInscriptionById('000000003');
    expect(inscription).toMatchObject(inscriptionData);
  });

  it('debería lanzar error si el estudiante no existe', async () => {
    await expect(service.getInscriptionById('999999999')).rejects.toThrow(
      RpcException,
    );
  });
  it('debería eliminar un estudiante por su ID', () => {
    const inscriptionData = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    service.createInscription(inscriptionData);

    service.deleteInscriptionById('000000004');

    const deletedInscription = service.getInscriptionById('000000004');

    expect(deletedInscription).toBeNull();
  });

  it('debería lanzar error al intentar eliminar un estudiante que no existe', async () => {
    await expect(service.deleteInscriptionById('999999999')).rejects.toThrow(
      RpcException,
    );
  });

  it('debería obtener todos los estudiantes', () => {
    const inscriptionsData = [
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
    service.createManyInscriptions(inscriptionsData);

    // Obtener los estudiantes con el servicio
    const inscriptions = service.getInscriptions();
    expect(inscriptions).toHaveLength(2);

    // Verificar que todos los estudiantes tengan todas las propiedades esperadas
    inscriptions.forEach((inscription, index) => {
      expect(inscription).toMatchObject(inscriptionsData[index]);
    });

    // Eliminar los estudiantes creados para limpiar la base de datos
    service.deleteManyInscriptionsById(inscriptionsData.map((s) => s.id));

    // Verificar que se eliminaron correctamente
    const remaininginscriptions: Inscription[] = service.getInscriptions();
    expect(remaininginscriptions).toHaveLength(0);
  });
});
