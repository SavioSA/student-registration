import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import CreateStudentDto from '../../../dto/create-student.dto';
@Controller()
export class StudentController {
  @MessagePattern({ cmd: 'test' })
  ping(createStudentDto: CreateStudentDto) {
    return of('pong');
  }
}
