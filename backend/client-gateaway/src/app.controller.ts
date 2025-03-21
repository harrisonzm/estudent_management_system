import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CoursesService } from './courses/courses.service';
import { InscriptionsService } from './inscriptions/inscriptions.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
    private readonly inscriptionService: InscriptionsService,
  ) {}

  // POST /user/student
  @Post('/user/student')
  createStudent(@Body() body: any) {
    return this.usersService.createStudent(body);
  }

  @Get('/users/student/')
  getStudents() {
    return this.usersService.getStudents();
  }

  // GET /users/student/:id
  @Get('/users/student/:id')
  getStudent(@Param('id') id: string) {
    return this.usersService.getStudentById(id);
  }

  // POST /course/inscription
  @Post('/course/inscription')
  createInscription(@Body() body: any) {
    return this.inscriptionService.createInscription(body);
  }

  // GET /course/inscription/:id
  @Get('/course/inscription/:id')
  getInscriptionById(@Param('id') id: string) {
    return this.inscriptionService.getInscriptionById(id);
  }

  @Get('/course/inscription/?course')
  getInscriptionByCourse(@Query('course') course: string) {
    return this.inscriptionService.getInscriptionByCourse(course);
  }

  // GET /course/:id
  @Get('/course/:id')
  getCourse(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  @Post('/course/')
  postCourse(@Body() data: any) {
    return this.coursesService.postCourse(data);
  }
}
