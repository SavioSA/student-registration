import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import CreateCourseDto from '../../../../dto/course/create-course.dto';
import UpdateCourseDto from '../../../../dto/course/update-course.dto';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @MessagePattern({ role: 'course', action: 'create' })
  createCourse(requestData: { createCourseDto: CreateCourseDto }) {
    return this.courseService.createCourse(requestData.createCourseDto);
  }

  @MessagePattern({ role: 'course', action: 'update' })
  updateCourse(requestData: {
    code: number;
    updateCourseDto: UpdateCourseDto;
  }) {
    return this.courseService.updateCourse(
      requestData.code,
      requestData.updateCourseDto,
    );
  }

  @MessagePattern({ role: 'course', action: 'delete' })
  deleteCourse(requestData: {
    code: number;
    updateCourseDto: UpdateCourseDto;
  }) {
    return this.courseService.deleteCourse(requestData.code);
  }

  @MessagePattern({ role: 'course', action: 'get' })
  getCourse(requestData: { code: number }) {
    return this.courseService.getCourse(requestData.code);
  }

  @MessagePattern({ role: 'course', action: 'get-all' })
  getAllCourses(requestData: { limit: number; page: number }) {
    return this.courseService.getAllCourse(requestData.limit, requestData.page);
  }

  @MessagePattern({ role: 'course', action: 'get-all-students' })
  getAllCourseStudent(requestData: {
    code: number;
    limit: number;
    page: number;
  }) {
    return this.courseService.getAllCourseStudent(
      requestData.code,
      requestData.limit,
      requestData.page,
    );
  }
}
