import { InjectQueue, OnQueueCompleted } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Job } from 'bull';
import CreateStudentDto from '../../../dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectQueue('student-queue') private studentQueue,
    @Inject('STUDENT_REGISTRATION')
    private readonly studentRegistrationService: ClientProxy,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      const job: Job = await this.studentQueue.add(
        'create-student',
        createStudentDto,
      );
      return await job.finished();
    } catch (error) {
      console.log(error);
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
