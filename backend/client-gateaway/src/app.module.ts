import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [HttpModule, UsersModule, InscriptionsModule, CoursesModule],
})
export class AppModule {}
