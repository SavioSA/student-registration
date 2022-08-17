import { InjectQueue } from '@nestjs/bull';
import { HttpException, Injectable } from '@nestjs/common';
import { Job } from 'bull';
import CreateStudentDto from '../../../../dto/student/create-student.dto';
import RegisterStudentInCourseDto from '../../../../dto/student/register-student-in-course.dto';

@Injectable()
export class StudentService {
  constructor(@InjectQueue('student-queue') private studentQueue) {}

  async waitJobProcess(job: Job) {
    await job.finished();
    const { returnvalue } = await this.studentQueue.getJobFromId(job.id);
    if (returnvalue.error) {
      const { error } = returnvalue;
      throw new HttpException(error.message, error.status);
    } else {
      return returnvalue;
    }
  }

  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      const job: Job = await this.studentQueue.add('process-request', {
        message: { role: 'student', action: 'create' },
        requestData: { createStudentDto },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async updateStudent(code: number, createStudentDto: CreateStudentDto) {
    try {
      const job: Job = await this.studentQueue.add('process-request', {
        message: { role: 'student', action: 'update' },
        requestData: { code, createStudentDto },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async deleteStudent(code: number) {
    try {
      const job: Job = await this.studentQueue.add('process-request', {
        message: { role: 'student', action: 'delete' },
        requestData: { code },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async getStudent(code: number) {
    try {
      const job: Job = await this.studentQueue.add('process-request', {
        message: { role: 'student', action: 'get' },
        requestData: { code },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
  async getAllStudents(limit: number, page: number) {
    try {
      const job: Job = await this.studentQueue.add('process-request', {
        message: { role: 'student', action: 'get-all' },
        requestData: { limit, page },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async getAllStudentCourses(code: number, limit: number, page: number) {
    try {
      const job: Job = await this.studentQueue.add('process-request', {
        message: { role: 'student', action: 'get-all-courses' },
        requestData: { code, limit, page },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  async registerStudentInACourse(
    studentCode: number,
    registerStudentInCourseDto: RegisterStudentInCourseDto,
  ) {
    try {
      const { courseCode } = registerStudentInCourseDto;
      const job: Job = await this.studentQueue.add('process-request', {
        message: { role: 'student', action: 'register-in-course' },
        requestData: { studentCode, courseCode },
      });
      const result = await this.waitJobProcess(job);
      return result;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
