import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Inscription, UpdateInscription } from './inscriptions.types';

@Injectable()
export class InscriptionsService {
  constructor(private readonly httpService: HttpService) {}
  createInscription(data: Inscription): Inscription {
    try {
      // //return this.httpService
      //   .post('http://users-microservice:3001/user/student', data)
      //   .toPromise();
      return {} as Inscription;
    } catch (err) {
      return {} as Inscription;
    }
  }

  createManyInscriptions(data: Inscription[]): Inscription {
    try {
      // //return this.httpService
      //   .post('http://users-microservice:3001/user/student', data)
      //   .toPromise();
      return {} as Inscription;
    } catch (err) {
      return {} as Inscription;
    }
  }

  getInscriptions(): Inscription[] {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return [{}, {}] as Inscription[];
    } catch (err) {
      return [];
    }
  }

  updateInscription(id: string, data: UpdateInscription): Inscription {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as Inscription;
    } catch (err) {
      return {} as Inscription;
    }
  }

  getInscriptionById(id: string): Inscription {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as Inscription;
    } catch (err) {
      return {} as Inscription;
    }
  }

  deleteInscriptionById(id: string): Inscription {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as Inscription;
    } catch (err) {
      return {} as Inscription;
    }
  }
  deleteManyInscriptionsById(data: string[]): Inscription[] {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return [{}, {}] as Inscription[];
    } catch (err) {
      return [] as Inscription[];
    }
  }
}
