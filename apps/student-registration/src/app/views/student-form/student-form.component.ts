import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.studentForm);

  }
}
