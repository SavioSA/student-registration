import { IsNumber } from 'class-validator';
class RegisterStudentInCourseDto {
  @IsNumber()
  courseCode: string;
}

export default RegisterStudentInCourseDto;
