import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { UsersService } from './users/users.service';
import { CoursesService } from './courses/courses.service';
import { InscriptionsService } from './inscriptions/inscriptions.service';
import { UsersModule } from './users/users.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [HttpModule, UsersModule, InscriptionsModule, CoursesModule],
  controllers: [AppController],
  providers: [UsersService, CoursesService, InscriptionsService],
})
export class AppModule {}
