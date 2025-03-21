import { Injectable, HttpServer } from '@nestjs/common';

@Injectable()
export class CoursesService {
  constructor(private readonly httpService: HttpServer) {}

  getCourseById(id: string) {
    return `course ${id}`; //this.httpService.get(`http://courses-microservice:3002/course/${id}`).toPromise();
  }

  postCourse(data: any) {
    return `course ${data}`; //this.httpService.post(`http://courses-microservice:3002/course/`, data).toPromise();
  }
}
