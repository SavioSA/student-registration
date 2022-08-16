import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseFilters,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { HttpExceptionFilter } from 'utils/http-exception.filter';
import CreateStudentDto from '../../../dto/create-student.dto';
import { StudentService } from './student.service';
@Controller('/api/v1/student')
@UseFilters(new HttpExceptionFilter())
@UsePipes(new ValidationPipe({ transform: true }))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post('/')
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.createStudent(createStudentDto);
  }
  @Put('/:code')
  async updateStudent(
    @Body() createStudentDto: CreateStudentDto,
    @Param('code') code: number,
  ) {
    return await this.studentService.updateStudent(code, createStudentDto);
  }
  @Delete('/:code')
  async deleteStudent(@Param('code') code: number) {
    return await this.studentService.deleteStudent(code);
  }
}
