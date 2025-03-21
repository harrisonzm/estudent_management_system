import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CoursesService } from './courses.service';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly coursesService: CoursesService,
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
    return this.coursesService.createInscription(body);
  }

  // GET /course/inscription/:id
  @Get('/course/inscription/:id')
  getInscriptionById(@Param('id') id: string) {
    return this.coursesService.getInscriptionById(id);
  }

  @Get('/course/inscription/?course')
  getInscriptionByCourse(@Query('course') course: string) {
    return this.coursesService.getInscriptionByCourse(course);
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
