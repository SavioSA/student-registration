import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DoneCallback, Job } from 'bull';
import { lastValueFrom } from 'rxjs';

@Processor('student-queue')
export class StudentProcessor {
  constructor(
    @Inject('STUDENT_REGISTRATION')
    private readonly studentRegistrationService: ClientProxy,
  ) {}
  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}...`);
  }
  @Process('create-student')
  async createStudent(job: Job, doneCallback: DoneCallback) {
    try {
      const result = this.studentRegistrationService.send<string>(
        { cmd: 'test' },
        job.data,
      );
      doneCallback(null, await lastValueFrom(result));
    } catch (error) {
      doneCallback(error, null);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
