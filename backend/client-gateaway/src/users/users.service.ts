import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UpdateUser, User, UserWithCourses } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  createStudent(data: User): User {
    try {
      // //return this.httpService
      //   .post('http://users-microservice:3001/user/student', data)
      //   .toPromise();
      return {} as User;
    } catch (err) {
      return {} as User;
    }
  }

  createManyStudents(data: User[]): User {
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

  updateStudent(id: string, data:UpdateUser): User {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as User;
    } catch (err) {
      return {} as User;
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

  deleteStudentById(id: string): User {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as User;
    } catch (err) {
      return {} as User;
    }
  }
  deleteManyStudentsById(data: string[]): User[] {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return [{}, {}] as User[];
    } catch (err) {
      return [] as User[];
    }
  }
}
