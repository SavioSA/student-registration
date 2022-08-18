import { Module } from '@nestjs/common';
import { CourseController } from './controllers/course/course.controller';
import { CourseService } from './controllers/course/course.service';
import { StudentController } from './controllers/student/student.controller';
import { StudentService } from './controllers/student/student.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController, CourseController],
  providers: [StudentService, CourseService],
})
export class AppModule {}
