import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import CreateStudentDto from '../../../dto/create-student.dto';
import { StudentService } from './student.service';
@Controller('/api/v1/student')
@UsePipes(new ValidationPipe({ transform: true }))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post('/')
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    try {
      return await this.studentService.createStudent(createStudentDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
