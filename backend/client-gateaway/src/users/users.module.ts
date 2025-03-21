import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config/envs';
import { USERS_SERVICE } from 'src/config/services';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.studentsMsHost, port: envs.studentsMsPort },
      },
    ]),
  ],
})
export class UsersModule {}
