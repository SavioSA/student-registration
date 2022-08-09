import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "STUDENT_REGISTRATION",
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8888
        }
      }
    ])
  ],
  controllers: [AppController, StudentController],
  providers: [AppService, StudentService]
})
export class AppModule {}
