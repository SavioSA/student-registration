import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DialogConfirmationComponent } from '../../components/dialog-confirmation/dialog-confirmation.component';
import CourseInterface from '../../interfaces/course.interface';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'student-registration-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }
  page = 0;
  pagesQuantity = 0;
  totalItems = 0;
  courses: CourseInterface[] = [];
  @ViewChild('paginator') paginator: any;
  ngOnInit(): void {
    this.getCourses();
  }

  changeIndex(pageEvent: PageEvent) {
    this.getCourses(7, pageEvent.pageIndex + 1)
    this.page = pageEvent.pageIndex + 1
  }

  async getCourses(limit = 7, page = 0) {
    const query = this.courseService.getCourses(limit, page);
    const result = await lastValueFrom(query);
    this.courses = result.courses
    this.pagesQuantity = result.pagesQuantity
    this.totalItems = result.totalItems
  }

  goToCourse(code: number) {
    this.router.navigate([`course/${code}`])
  }

  async deleteCourse(courseId: number) {
    const deleteQuery = this.courseService.deleteCourse(courseId);
    const result = await lastValueFrom(deleteQuery);
    if (result.message) {
      this._snackBar.open('Curso excluído com sucesso.', 'Ok');
      this.paginator.pageIndex = 0
      this.ngOnInit();
    }
  }

  openDeleteDialog(courseInformations: {
    code: number;
    description: string;
  }) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '16rem',
      height: '184px',
      data: {
        message: `Deseja realmente excluir o curso ${courseInformations.description}?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.response) {
        this.deleteCourse(courseInformations.code);
      }
    });
  }
}
