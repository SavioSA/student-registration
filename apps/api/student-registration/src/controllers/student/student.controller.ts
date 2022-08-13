import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import CreateStudentDto from '../../../../dto/create-student.dto';
import { StudentService } from './student.service';
@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @MessagePattern({ role: 'student', action: 'create' })
  createStudent(createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }
}
