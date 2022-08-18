import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { HttpExceptionFilter } from 'utils/http-exception.filter';
import CreateStudentDto from '../../../../dto/student/create-student.dto';
import RegisterStudentInCourseDto from '../../../../dto/student/register-student-in-course.dto';
import { StudentService } from './student.service';
@Controller('/api/v1/student')
@UseFilters(new HttpExceptionFilter())
@UsePipes(new ValidationPipe({ transform: true }))
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Post('/')
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    console.log('**************');

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

  @Get('/:code')
  async getStudent(@Param('code') code: number) {
    return await this.studentService.getStudent(code);
  }

  @Get('/')
  async getAllStudents(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return await this.studentService.getAllStudents(limit, page);
  }

  @Get('/:code/courses/')
  async getAllStudentCourses(
    @Param('code') code: number,
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return await this.studentService.getAllStudentCourses(code, limit, page);
  }

  @Post('/:code/courses')
  async registerStudentInACourse(
    @Param('code') studentCode: number,
    @Body() registerStudentInCourseDto: RegisterStudentInCourseDto,
  ) {
    return await this.studentService.registerStudentInACourse(
      studentCode,
      registerStudentInCourseDto,
    );
  }

  @Delete('/:code/courses/:courseCode')
  async removeStudentFromACourse(
    @Param('code') studentCode: number,
    @Param('courseCode') courseCode: number,
  ) {
    return await this.studentService.removeStudentFromACourse(
      studentCode,
      courseCode,
    );
  }
}
