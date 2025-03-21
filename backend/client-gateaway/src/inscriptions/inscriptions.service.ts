import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class InscriptionsService {
  constructor(private readonly httpService: HttpService) {}
  createInscription(data: any) {
    return `inscrip ${data}`; //this.httpService.post('http://courses-microservice:3003/course/inscription', data).toPromise();
  }

  getInscriptionById(id: string) {
    return `obtener incripción  del estudiante ${id}`; //this.httpService.get(`http://courses-microservice:3003/course/inscription/${id}`).toPromise();
  }

  getInscriptionByCourse(course: string) {
    return `obtener incripciones del curso ${course}`; //this.httpService.get(`http://courses-microservice:3003/course/inscription/?course=${course}`).toPromise();
  }
}
