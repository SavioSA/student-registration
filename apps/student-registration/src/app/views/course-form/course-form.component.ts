import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'student-registration-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseCode = 0;
  courseForm = this.fb.group({
    description: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      }
    ],
    menu: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)]
      }
    ]
  })
  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {}
}
