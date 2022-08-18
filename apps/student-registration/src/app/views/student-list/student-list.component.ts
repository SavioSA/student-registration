import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DialogConfirmationComponent } from '../../components/dialog-confirmation/dialog-confirmation.component';
import StudentInterface from '../../interfaces/student.interface';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'student-registration-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }
  students: StudentInterface[] = [];
  pagesQuantity = 0;
  totalItems = 0;
  page = 0;

  async ngOnInit(): Promise<void> {
    this.getStudents();
  }

  changeIndex(pageEvent: PageEvent) {
    this.getStudents(7, pageEvent.pageIndex + 1)
    this.page = pageEvent.pageIndex + 1
  }

  async getStudents(limit = 7, page = 0) {
    const query = this.studentService.getStudents(limit, page);
    const result = await lastValueFrom(query);
    this.students = result.students
    this.pagesQuantity = result.pagesQuantity
    this.totalItems = result.totalItems
  }

  goToStudent(code: number) {
    this.router.navigate([`student/${code}`])
  }

  async deleteStudent(studentId: number) {
    const deleteQuery = this.studentService.deleteStudent(studentId);
    const result = await lastValueFrom(deleteQuery);
    if (result.message) {
      this._snackBar.open('Usuário excluído com sucesso.', 'Ok');
      this.ngOnInit();
    }
  }

  openDeleteDialog(studentInformations: {
    code: number;
    name: string;
  }) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '16rem',
      height: '184px',
      data: {
        message: `Deseja realmente excluir o aluno ${studentInformations.name}?`,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.response) {
        this.deleteStudent(studentInformations.code);
      }
    });
  }
}
