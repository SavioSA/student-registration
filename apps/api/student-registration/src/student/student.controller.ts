import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import CreateStudentDto from "../../../dto/create-student.dto";
@Controller()
export class StudentController {
  @MessagePattern({ cmd: "ping" })
  ping(createStudentDto: CreateStudentDto) {
    console.log(createStudentDto);

    return of("pong").pipe(delay(1000));
  }
}
