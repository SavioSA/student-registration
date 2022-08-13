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
  @Process('process-request')
  async createStudent(job: Job, doneCallback: DoneCallback) {
    try {
      const query = this.studentRegistrationService.send<string>(
        job.data.message,
        job.data.dto,
      );

      const result = await lastValueFrom(query);
      doneCallback(null, result);
    } catch (error) {
      doneCallback(error, null);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
