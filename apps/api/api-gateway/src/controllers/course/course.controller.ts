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
import CreateCourseDto from '../../../../dto/course/create-course.dto';
import UpdateCourseDto from '../../../../dto/course/update-course.dto';
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

  @Put('/:code')
  async updateCourse(
    @Body() updateCourseDto: UpdateCourseDto,
    @Param('code') code: number,
  ) {
    return await this.courseService.updateCourse(code, updateCourseDto);
  }

  @Delete('/:code')
  async deleteCourse(@Param('code') code: number) {
    return await this.courseService.deleteCourse(code);
  }

  @Get('/:code')
  async getCourse(@Param('code') code: number) {
    return await this.courseService.getCourse(code);
  }

  @Get('/')
  async getAllCourses(
    @Query('offset') offset: number,
    @Query('page') page: number,
  ) {
    return await this.courseService.getAllCourses(offset, page);
  }
}
