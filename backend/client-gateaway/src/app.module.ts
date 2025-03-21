import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { UsersService } from './users/users.service';
import { CoursesService } from './courses/courses.service';
import { InscriptionsService } from './inscriptions/inscriptions.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [UsersService, CoursesService, InscriptionsService],
})
export class AppModule {}
