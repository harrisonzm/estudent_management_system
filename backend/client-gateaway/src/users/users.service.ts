import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { User, UserWithCourses } from './users.type';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  createStudent(data: any): User {
    try {
      // //return this.httpService
      //   .post('http://users-microservice:3001/user/student', data)
      //   .toPromise();
      return {} as User;
    } catch (err) {
      return {} as User;
    }
  }

  getStudents(): User[] {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return [{}, {}] as User[];
    } catch (err) {
      return [];
    }
  }

  getStudentById(id: string): User {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as User;
    } catch (err) {
      return {} as User;
    }
  }
}
