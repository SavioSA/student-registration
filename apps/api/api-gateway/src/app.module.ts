import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { StudentProcessor } from './student/student.processor';
import { StudentService } from './student/student.service';

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
      processors: [join(__dirname, '/student/student.processor')],
    }),
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService, StudentProcessor],
})
export class AppModule {}
