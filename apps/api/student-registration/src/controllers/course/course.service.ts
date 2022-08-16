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

  async deleteCourse(code: number) {
    try {
      const courseExists = await this.courseRepository.findOne({
        where: {
          code,
        },
      });
      if (!courseExists) {
        throw new RpcException({
          status: 404,
          message: 'Course not found.',
        });
      } else {
        await this.courseRepository.softDelete({ code });
        return { message: 'Course deleted successfully' };
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getCourse(code: number) {
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
        return course;
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getAllCourse(limit = 0, page = 0) {
    try {
      const take: number = !limit ? 0 : limit;
      let currentPage: number = !page ? 0 : page;
      currentPage = currentPage > 0 ? currentPage - 1 : currentPage;
      const itensPerPage = currentPage * take;

      const coursesSearch = await this.courseRepository.findAndCount({
        take,
        skip: itensPerPage,
      });

      const courses = coursesSearch[0];
      const coursesTotalCount: number = coursesSearch[1];
      const pagesQuantity: number = Math.ceil(
        coursesTotalCount / (limit || coursesTotalCount),
      );
      return { courses, pagesQuantity, totalItems: coursesTotalCount };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
