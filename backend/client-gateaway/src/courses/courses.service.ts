import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Course, UpdateCourse } from './courses.types';

@Injectable()
export class CoursesService {
  constructor(private readonly httpService: HttpService) {}

  createCourse(data: Course): Course {
    try {
      // //return this.httpService
      //   .post('http://users-microservice:3001/user/student', data)
      //   .toPromise();
      return {} as Course;
    } catch (err) {
      return {} as Course;
    }
  }

  createManyCourses(data: Course[]): Course {
    try {
      // //return this.httpService
      //   .post('http://users-microservice:3001/user/student', data)
      //   .toPromise();
      return {} as Course;
    } catch (err) {
      return {} as Course;
    }
  }

  getCourses(): Course[] {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return [{}, {}] as Course[];
    } catch (err) {
      return [];
    }
  }

  updateCourse(id: string, data: UpdateCourse): Course {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as Course;
    } catch (err) {
      return {} as Course;
    }
  }

  getCourseById(id: string): Course {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as Course;
    } catch (err) {
      return {} as Course;
    }
  }

  deleteCourseById(id: string): Course {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return {} as Course;
    } catch (err) {
      return {} as Course;
    }
  }
  deleteManyCoursesById(data: string[]): Course[] {
    try {
      // return this.httpService
      //   .get(`http://users-microservice:3001/users/student/${id}`)
      //   .toPromise();
      return [{}, {}] as Course[];
    } catch (err) {
      return [] as Course[];
    }
  }
}
