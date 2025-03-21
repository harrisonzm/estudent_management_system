import { Injectable, HttpServer } from '@nestjs/common';

@Injectable()
export class CoursesService {
  constructor(private readonly httpService: HttpServer) {}

  createInscription(data: any) {
    return this.httpService.post('http://courses-microservice:3002/course/inscription', data).toPromise();
  }
  getInscriptionById(id: string) {
    return this.httpService.get(`http://courses-microservice:3002/course/inscription/${id}`).toPromise();
  }

  getCourseById(id: string) {
    return this.httpService.get(`http://courses-microservice:3002/course/${id}`).toPromise();
  }
}
