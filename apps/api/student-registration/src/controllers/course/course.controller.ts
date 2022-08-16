import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import CreateCourseDto from '../../../../dto/create-course.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @MessagePattern({ role: 'course', action: 'create' })
  createCourse(requestData: { createStudentDto: CreateCourseDto }) {
    return this.courseService.createCourse(requestData.createStudentDto);
  }
}
