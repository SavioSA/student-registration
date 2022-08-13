import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateStudentDto from '../../../../dto/create-student.dto';
import Student from '../../database/entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_REPOSITORY')
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    try {
      return await this.studentRepository.save(createStudentDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
