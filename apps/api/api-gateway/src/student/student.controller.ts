import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post } from '@nestjs/common';
import CreateStudentDto from '../../../dto/create-student.dto';
import { StudentService } from './student.service';
@Controller('/api/v1/student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    @InjectQueue('student-queue') private studentQueue,
  ) {}
  @Post('/')
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    try {
      return this.studentService.createStudent(createStudentDto);
    } catch (error) {
      console.log(error);
    }
  }
}
