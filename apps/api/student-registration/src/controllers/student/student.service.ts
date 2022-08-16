import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import CreateStudentDto from '../../../../dto/student/create-student.dto';
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
          message: 'Student not found.',
        });
      } else {
        await this.studentRepository.update({ code }, createStudentDto);
        return { message: 'Student updated successfully' };
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async deleteStudent(code: number) {
    try {
      const studentExists = await this.studentRepository.findOne({
        where: {
          code,
        },
      });
      if (!studentExists) {
        throw new RpcException({
          status: 404,
          message: 'Student not found.',
        });
      } else {
        await this.studentRepository.softDelete({ code });
        return { message: 'Student deleted successfully' };
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async getStudent(code: number) {
    try {
      const student = await this.studentRepository.findOne({
        where: {
          code,
        },
      });
      if (!student) {
        throw new RpcException({
          status: 404,
          message: 'Student not found.',
        });
      } else {
        return student;
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async getAllStudents(offset = 0, page = 0) {
    try {
      const take: number = !offset ? 0 : offset;
      let currentPage: number = !page ? 0 : page;
      currentPage = currentPage > 0 ? currentPage - 1 : currentPage;
      const itensPerPage = currentPage * take;

      const studentsSearch = await this.studentRepository.findAndCount({
        take,
        skip: itensPerPage,
      });

      const students = studentsSearch[0];
      const studentsTotalCount: number = studentsSearch[1];
      const pagesQuantity: number = Math.ceil(
        studentsTotalCount / (offset || studentsTotalCount),
      );
      return { students, pagesQuantity, totalItems: studentsTotalCount };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
