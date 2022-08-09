import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
@Controller()
export class StudentController {
  @MessagePattern({ cmd: 'test' })
  ping(createStudentDto: string) {
    console.log(createStudentDto);
    return of("pong").pipe(delay(1000));
  }
}
