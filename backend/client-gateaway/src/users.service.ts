import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async createStudent(data: any) {
    return this.httpService.post('http://users-microservice:3001/user/student', data).toPromise();
  }

  async getStudentById(id: string) {
    return this.httpService.get(`http://users-microservice:3001/users/student/${id}`).toPromise();
  }
}
