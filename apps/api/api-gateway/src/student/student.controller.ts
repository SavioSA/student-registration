import { Controller, Post } from '@nestjs/common';
import CreateStudentDto from '../../../dto/create-student.dto';
import { StudentService } from './student.service';
@Controller('/api/v1/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post('/')
  pingServiceA(createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }
}
