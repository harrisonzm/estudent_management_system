import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CoursesService {
  constructor(private readonly httpService: HttpService) {}

  getCourseById(id: string) {
    return `course ${id}`; //this.httpService.get(`http://courses-microservice:3002/course/${id}`).toPromise();
  }

  postCourse(data: any) {
    return `course ${data}`; //this.httpService.post(`http://courses-microservice:3002/course/`, data).toPromise();
  }
}
