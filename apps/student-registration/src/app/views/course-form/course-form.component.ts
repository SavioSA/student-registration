import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DialogConfirmationComponent } from '../../components/dialog-confirmation/dialog-confirmation.component';
import StudentInterface from '../../interfaces/student.interface';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { AddStudentDialogComponent } from './components/add-student-dialog/add-student-dialog.component';

@Component({
  selector: 'student-registration-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseCode: number | undefined;
  students: StudentInterface[] = [];
  pagesQuantity = 0;
  totalItems = 0;
  page = 0;
  courseForm = this.fb.group({
    description: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      },
    ],
    menu: [
      '',
      {
        validators: [Validators.required, Validators.minLength(3)],
      },
    ],
  });
  codeForm = this.fb.group({
    code: [
      '',
      {
        validators: [Validators.required],
      },
    ],
  });
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private studentService: StudentService
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
      description: this.courseForm.controls.description.value as string,
    });
    const result = await lastValueFrom(queryPost);
    if (result.code) {
      this._snackBar.open('Curso criado com sucesso.', 'OK');
      this.router.navigate([`/course/${result.code}`]);
    }
  }

  async updateCourse() {
    const queryPut = this.courseService.updateCourse(
      this.courseCode as number,
      {
        menu: this.courseForm.controls.menu.value as string,
        description: this.courseForm.controls.description.value as string,
      }
    );
    const result = await lastValueFrom(queryPut);
    if (result.message) {
      this._snackBar.open('Curso editado com sucesso.', 'OK');
    }
  }

  async getCourse(code: number) {
    const query = this.courseService.getCourse(code);
    const result = await lastValueFrom(query);

    if (result.code) {
      this.courseCode = result.code;
      this.courseForm.controls.description.setValue(result.description);
      this.courseForm.controls.menu.setValue(result.menu);
      this.getCourseStudents();
    }
  }

  async getCourseStudents(limit = 7, page = 0) {
    const query = this.courseService.getCourseStudents(
      this.courseCode as number,
      limit,
      page
    );
    const result = await lastValueFrom(query);
    this.students = result;
  }

  openDeleteDialog(studentInformations: { code: number; name: string }) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '16rem',
      height: '184px',
      data: {
        message: `Deseja realmente remover o aluno ${studentInformations.name}?`,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result.response) {
        const query = this.studentService.removeStudentFromACourse(
          studentInformations.code as number,
          this.courseCode as number
        );
        await lastValueFrom(query);
        this.ngOnInit();
        this._snackBar.open('Aluno removido com sucesso.', 'Ok');
      }
    });
  }

  changeIndex(pageEvent: PageEvent) {
    this.getCourseStudents(7, pageEvent.pageIndex + 1);
    this.page = pageEvent.pageIndex + 1;
  }

  async openDialog() {
    const dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width: '16rem',
      height: '360px',
      data: {
        formData: this.codeForm,
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result.validated) {
        const query = this.studentService.registerStudentInACourse(
          parseInt(this.codeForm.controls.code.value as string),
          this.courseCode as number
        );
        await lastValueFrom(query);
        this.getCourseStudents(7, this.page);
      }
    });
  }
}
