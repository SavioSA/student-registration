import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { HttpExceptionFilter } from 'utils/http-exception.filter';
import CreateCourseDto from '../../../../dto/create-course.dto';
import { CourseService } from './course.service';

@Controller('/api/v1/course')
@UseFilters(new HttpExceptionFilter())
@UsePipes(new ValidationPipe({ transform: true }))
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Post('/')
  async createStudent(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.createCourse(createCourseDto);
  }
}
