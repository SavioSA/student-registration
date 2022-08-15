import { InjectQueue } from '@nestjs/bull';
import { HttpException, Injectable } from '@nestjs/common';
import { Job } from 'bull';
import CreateStudentDto from '../../../dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectQueue('student-queue') private studentQueue) {}

  async waitJobProcess(job: Job) {
    await job.finished();
    const { returnvalue } = await this.studentQueue.getJobFromId(job.id);
    if (returnvalue.error) {
      const { error } = returnvalue;
      console.log(error);

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
      console.error(error);
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
      console.log(error);

      throw new HttpException(error.response, error.status);
    }
  }
}
