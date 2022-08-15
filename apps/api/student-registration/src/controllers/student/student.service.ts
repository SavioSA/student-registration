import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
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
      throw new RpcException(error);
    }
  }
  async updateStudent(code: number, createStudentDto: CreateStudentDto) {
    try {
      const studentExists = await this.studentRepository.findOne({
        where: {
          code,
        },
      });
      if (!studentExists) {
        throw new RpcException({
          status: 404,
          message: 'User not found.',
        });
      } else {
        return await this.studentRepository.update({ code }, createStudentDto);
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
