import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import Course from 'src/database/entities/course.entity';
import { Repository } from 'typeorm';
import CreateCourseDto from '../../../../dto/course/create-course.dto';
import UpdateCourseDto from '../../../../dto/course/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private courseRepository: Repository<Course>,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      return await this.courseRepository.save(createCourseDto);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateCourse(code: number, updateCourseDto: UpdateCourseDto) {
    try {
      const course = await this.courseRepository.findOne({
        where: {
          code,
        },
      });
      if (!course) {
        throw new RpcException({
          status: 404,
          message: 'Course not found.',
        });
      } else {
        await this.courseRepository.update({ code }, updateCourseDto);
        return { message: 'course updated successfully' };
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
