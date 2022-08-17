import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import CreateStudentDto from '../../../../dto/student/create-student.dto';
import { StudentService } from './student.service';
@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @MessagePattern({ role: 'student', action: 'create' })
  createStudent(requestData: { createStudentDto: CreateStudentDto }) {
    return this.studentService.createStudent(requestData.createStudentDto);
  }

  @MessagePattern({ role: 'student', action: 'update' })
  updateStudent(requestData: {
    code: number;
    createStudentDto: CreateStudentDto;
  }) {
    return this.studentService.updateStudent(
      requestData.code,
      requestData.createStudentDto,
    );
  }

  @MessagePattern({ role: 'student', action: 'delete' })
  deleteStudent(requestData: { code: number }) {
    return this.studentService.deleteStudent(requestData.code);
  }

  @MessagePattern({ role: 'student', action: 'get' })
  getStudent(requestData: { code: number }) {
    return this.studentService.getStudent(requestData.code);
  }

  @MessagePattern({ role: 'student', action: 'get-all' })
  getAllStudents(requestData: { limit: number; page: number }) {
    return this.studentService.getAllStudents(
      requestData.limit,
      requestData.page,
    );
  }

  @MessagePattern({ role: 'student', action: 'get-all-courses' })
  getAllStudentCourses(requestData: {
    code: number;
    limit: number;
    page: number;
  }) {
    return this.studentService.getAllStudentCourses(
      requestData.code,
      requestData.limit,
      requestData.page,
    );
  }

  @MessagePattern({ role: 'student', action: 'register-in-course' })
  registerStudentInACourse(requestData: {
    studentCode: number;
    courseCode: number;
  }) {
    return this.studentService.registerStudentInACourse(
      requestData.studentCode,
      requestData.courseCode,
    );
  }
}
