import { Module } from '@nestjs/common';
import { InscriptionsController } from './inscriptions.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, INSCRIPTION_SERVICE } from 'src/config';

@Module({
  controllers: [InscriptionsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: INSCRIPTION_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.studentsMsHost, port: 3003 },
      },
    ]),
  ],
})
export class InscriptionsModule {}
