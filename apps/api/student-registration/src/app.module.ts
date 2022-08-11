import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StudentController } from './controllers/student/student.controller';
import { StudentService } from './controllers/student/student.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, StudentController],
  providers: [StudentService],
})
export class AppModule {}
