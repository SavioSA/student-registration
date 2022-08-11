import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import CreateStudentDto from '../../../../dto/create-student.dto';
import { StudentService } from './student.service';
@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @MessagePattern({ cmd: 'test' })
  createStudent(createStudentDto: CreateStudentDto) {
    console.log('ss');

    this.studentService.createStudent(createStudentDto);
  }
}
