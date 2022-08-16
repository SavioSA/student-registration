import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import Course from 'src/database/entities/course.entity';
import { Repository } from 'typeorm';
import CreateCourseDto from '../../../../dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private courseRepository: Repository<Course>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      console.log(createCourseDto);
      return await this.courseRepository.save(createCourseDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
