import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import CreateStudentDto from '../../../dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectQueue('student-queue') private studentQueue) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      const job: Job = await this.studentQueue.add(
        'create-student',
        createStudentDto,
      );
      await job.finished();
      const { returnvalue } = await this.studentQueue.getJobFromId(job.id);
      return returnvalue;
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
