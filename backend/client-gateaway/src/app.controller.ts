import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CoursesService } from './courses/courses.service';
import { InscriptionsService } from './inscriptions/inscriptions.service';
import { CreateUser, User, UserWithCourses } from './users/users.type';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
    private readonly inscriptionService: InscriptionsService,
  ) {}

  // POST /user/student
  @Post('/users/student')
  createStudent(@Body() body: CreateUser): User {
    return this.usersService.createStudent(body);
  }

  @Get('/users/students/')
  getStudents(): User[] {
    return this.usersService.getStudents();
  }

  // GET /users/student/:id
  @Get('/users/students/:id')
  getStudent(@Param('id') id: string): User {
    return this.usersService.getStudentById(id);
  }

  // POST /course/inscription
  @Post('/courses/inscriptions')
  createInscription(@Body() body: any) {
    return this.inscriptionService.createInscription(body);
  }

  // GET /course/inscription/:id
  @Get('/courses/inscriptions/:id')
  getInscriptionById(@Param('id') id: string) {
    return this.inscriptionService.getInscriptionById(id);
  }

  @Get('/courses/inscriptions/')
  getInscriptionByCourse(@Query('course') course: string) {
    return this.inscriptionService.getInscriptionByCourse(course);
  }

  // GET /course/:id
  @Get('/courses/:id')
  getCourse(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Post('/courses/')
  postCourse(@Body() data: any) {
    return this.coursesService.postCourse(data);
  }
}
