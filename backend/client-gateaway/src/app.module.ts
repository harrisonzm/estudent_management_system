import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { UsersService } from './users.service';
import { CoursesService } from './courses.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [UsersService, CoursesService],
})
export class AppModule {}
