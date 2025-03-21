import { Injectable, HttpServer } from '@nestjs/common';

@Injectable()
export class CoursesService {
  constructor(private readonly httpService: HttpServer) {}

  createInscription(data: any) {
    return `inscrip ${data}`; //this.httpService.post('http://courses-microservice:3003/course/inscription', data).toPromise();
  }

  getInscriptionById(id: string) {
    return `obtener incripción  del estudiante ${id}`; //this.httpService.get(`http://courses-microservice:3003/course/inscription/${id}`).toPromise();
  }

  getInscriptionByCourse(course: string) {
    return `obtener incripciones del curso ${course}`; //this.httpService.get(`http://courses-microservice:3003/course/inscription/?course=${course}`).toPromise();
  }

  getCourseById(id: string) {
    return `course ${id}`; //this.httpService.get(`http://courses-microservice:3002/course/${id}`).toPromise();
  }

  postCourse(data: any) {
    return `course ${data}`; //this.httpService.post(`http://courses-microservice:3002/course/`, data).toPromise();
  }
}
