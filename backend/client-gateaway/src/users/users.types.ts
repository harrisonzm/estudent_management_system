import { Course } from 'src/courses/courses.types';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  personalEmail: string;
  institutionalEmail: string;
  birthDate: Date;
  nationality: string;
}
export class UpdateUser extends PartialType(User) {}

export interface UserWithCourses {
  user: User;
  courses?: Course[];
}
