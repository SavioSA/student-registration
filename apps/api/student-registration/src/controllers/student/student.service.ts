import { Inject, Injectable } from '@nestjs/common';
import Student from 'src/database/entities/student.entity';
import { Repository } from 'typeorm';
import CreateStudentDto from '../../../../dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const student: Student = new Student();
    student.name = createStudentDto.name;
    student.courses = [
      {
        description: 'dasdasd',
        menu: 'asdasdsad',
        code: 1,
      },
    ];
    await this.studentRepository.save(student);
  }
}
