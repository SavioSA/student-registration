import { InjectQueue } from '@nestjs/bull';
import { HttpException, Injectable } from '@nestjs/common';
import { Job } from 'bull';
import CreateCourseDto from '../../../../dto/course/create-course.dto';
import UpdateCourseDto from '../../../../dto/course/update-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectQueue('course-queue') private courseQueue) {}

  async waitJobProcess(job: Job) {
    await job.finished();
    const { returnvalue } = await this.courseQueue.getJobFromId(job.id);
    if (returnvalue.error) {
      const { error } = returnvalue;
      throw new HttpException(error.message, error.status);
    } else {
      return returnvalue;
    }
  }

  async createCourse(createCourseDto: CreateCourseDto) {
    try {
      const job: Job = await this.courseQueue.add('process-request', {
        message: { role: 'course', action: 'create' },
        requestData: { createCourseDto },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async updateCourse(code: number, updateCourseDto: UpdateCourseDto) {
    try {
      const job: Job = await this.courseQueue.add('process-request', {
        message: { role: 'course', action: 'update' },
        requestData: { code, updateCourseDto },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
