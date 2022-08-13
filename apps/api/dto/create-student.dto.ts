import { IsString, MaxLength, MinLength } from 'class-validator';
class CreateStudentDto {
  @IsString()
  @MaxLength(50, { message: "Name must be a maximum of 50 characters" })
  @MinLength(3, { message: "Name must be a mininum of 50 characters" })
  name: string;
}

export default CreateStudentDto;
