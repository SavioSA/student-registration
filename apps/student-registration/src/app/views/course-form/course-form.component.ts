import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'student-registration-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseCode :number | undefined;
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
    private courseService: CourseService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['code']) {
        this.courseCode = params['code'];
        this.getCourse(this.courseCode as number);
        if (isNaN(this.courseCode as number)) {
          this.router.navigate([`/`]);
        }
      }
    });
  }

  saveCourse() {
    if (this.courseCode) {
      this.updateCourse();
    } else {
      this.createCourse();
    }
  }

  async createCourse() {
    const queryPost = this.courseService.registerCourse({
      menu: this.courseForm.controls.menu.value as string,
      description: this.courseForm.controls.description.value as string
    })
    const result = await lastValueFrom(queryPost);
    if (result.code) {
      this._snackBar.open("Curso criado com sucesso.", "OK")
      this.router.navigate([`/course/${result.code}`])
    }
  }

  async updateCourse() {
    const queryPut = this.courseService.updateCourse(this.courseCode as number, {
      menu: this.courseForm.controls.menu.value as string,
      description: this.courseForm.controls.description.value as string
    });
    const result = await lastValueFrom(queryPut);
    if (result.message) {
      this._snackBar.open("Curso editado com sucesso.", "OK")
    }
  }

  async getCourse(code: number) {
    const query = this.courseService.getCourse(code)
    const result = await lastValueFrom(query);

    if (result.code) {
      this.courseCode = result.code;
      this.courseForm.controls.description.setValue(result.description);
      this.courseForm.controls.menu.setValue(result.menu);
    }
  }

}
