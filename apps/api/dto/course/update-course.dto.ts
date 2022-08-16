import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
class UpdateCourseDto {
  @IsString()
  @MaxLength(50, { message: "Description must be a maximum of 50 characters" })
  @MinLength(3, { message: "Description must be a mininum of 3 characters" })
  @IsOptional()
  description: string;

  @IsString()
  @MinLength(3, { message: "Menu must be a mininum of 3 characters" })
  @IsOptional()
  menu: string;
}


export default UpdateCourseDto;
