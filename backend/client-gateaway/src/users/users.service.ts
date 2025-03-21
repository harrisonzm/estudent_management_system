import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  createStudent(data: any) {
    try {
      // //return this.httpService
      //   .post('http://users-microservice:3001/user/student', data)
      //   .toPromise();
      return `creado ${data}`;
    } catch (err) {
      return null;
    }
  }

  getStudents() {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return ` obtenidos`;
    } catch (err) {
      return null;
    }
  }

  getStudentById(id: string) {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return ` obtenido ${id}`;
    } catch (err) {
      return null;
    }
  }
}
