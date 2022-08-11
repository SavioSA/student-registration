import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { Response } from 'express';
import CreateStudentDto from '../../../dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectQueue('student-queue') private studentQueue) {}

  async createStudent(createStudentDto: CreateStudentDto, res: Response) {
    try {
      const job: Job = await this.studentQueue.add(
        'create-student',
        createStudentDto,
      );

      await job.finished();
      console.log(job.isFailed());
    } catch (error) {
      console.error(error);
    }
  }

  @OnQueueCompleted({
    name: 'student-queue',
  })
  taskDone(job: Job, result: any) {
    console.log('9999999999');
    return result;
  }
}
