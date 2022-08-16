import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CourseController } from './controllers/course/course.controller';
import { CourseProcessor } from './controllers/course/course.processor';
import { CourseService } from './controllers/course/course.service';
import { StudentController } from './controllers/student/student.controller';
import { StudentProcessor } from './controllers/student/student.processor';
import { StudentService } from './controllers/student/student.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENT_REGISTRATION',
        transport: Transport.TCP,
        options: {
          host: process.env.STUDENT_REGISTRATION_SERVICE_HOSTNAME,
          port: process.env
            .STUDENT_REGISTRATION_SERVICE_PORT as unknown as number,
        },
      },
    ]),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'student-queue',
      processors: [join(__dirname, '/controllers/student/student.processor')],
    }),
    BullModule.registerQueue({
      name: 'course-queue',
      processors: [join(__dirname, '/controllers/course/course.processor')],
    }),
  ],
  controllers: [StudentController, CourseController],
  providers: [StudentService, StudentProcessor, CourseService, CourseProcessor],
})
export class AppModule {}
