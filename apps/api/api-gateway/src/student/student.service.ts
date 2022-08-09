import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import CreateStudentDto from '../../../dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REGISTRATION')
    private readonly clientServiceA: ClientProxy,
  ) {}

  createStudent(createStudentDto: CreateStudentDto) {
    const startTs = Date.now();
    return this.clientServiceA
      .send<string>({ cmd: 'test' }, createStudentDto)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
}
