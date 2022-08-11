import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
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
  async createStudent(job: Job, DoneCallback: DoneCallback) {
    try {
      const result = this.studentRegistrationService.send<string>(
        { cmd: 'test' },
        job.data,
      );
      DoneCallback(null, await lastValueFrom(result));
    } catch (error) {
      DoneCallback(error, null);
      console.log(error);
    }
  }
}
