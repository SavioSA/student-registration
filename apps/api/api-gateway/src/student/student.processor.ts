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
  @Process('process-request')
  async processRequest(job: Job, doneCallback: DoneCallback) {
    const query = this.studentRegistrationService.send<string>(
      job.data.message,
      job.data.requestData,
    );
    const result = await lastValueFrom(query).catch((error) => {
      doneCallback(null, error);
    });
    doneCallback(null, result);
  }
}
