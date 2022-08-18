import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'student-registration-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  studentForm = this.fb.group({
    name: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      }
    ]
  })
  studentCode: number | undefined;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['code']) {
        this.studentCode = params['code'];
        this.getStudent(this.studentCode as number);
        if (this.studentForm.controls.name.value !== '') {
          this.router.navigate([`/`]);
        }
      }
    });
  }

  saveStudent() {
    if (this.studentCode) {
      this.updateStudent()
    } else {
      this.createStudent()
    }
  }

  async createStudent() {
    const queryPost = this.studentService.registerStudent({
      name: this.studentForm.controls.name.value as string
    })
    const result = await lastValueFrom(queryPost)
    if (result.code) {
      this.router.navigate([`/student/${result.code}`])
    }
  }

  async updateStudent() {
    const queryPut = this.studentService.updateStudent( this.studentCode as number,{
      name: this.studentForm.controls.name.value as string
    });
    const result = await lastValueFrom(queryPut);
    console.log(result);
  }

  async getStudent(code: number) {
    const query = this.studentService.getStudent(code)
    const result = await lastValueFrom(query);
    if (result.code) {
      this.studentCode = result.code;
      this.studentForm.controls.name.setValue(result.name);
    }
  }
}
