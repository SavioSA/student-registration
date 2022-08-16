import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StudentController } from './controllers/student/student.controller';
import { StudentService } from './controllers/student/student.service';
import { DatabaseModule } from './database/database.module';
import { CourseController } from './controllers/course/course.controller';
import { CourseService } from './controllers/course/course.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController, StudentController, CourseController],
  providers: [StudentService, CourseService],
})
export class AppModule {}
