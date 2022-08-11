import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StudentController } from './student/student.controller';

@Module({
  imports: [],
  controllers: [AppController, StudentController],
  providers: [],
})
export class AppModule {}
