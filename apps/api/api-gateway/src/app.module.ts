import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
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
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService],
})
export class AppModule {}
