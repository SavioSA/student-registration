import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
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
    private router: Router
  ) { }
  students: StudentInterface[] = [];
  pagesQuantity = 0;
  totalItems = 0;
  async ngOnInit(): Promise<void> {
    this.getStudents();
  }
  changeIndex(pageEvent: PageEvent) {
    this.getStudents(8, pageEvent.pageIndex + 1 )
  }

  async getStudents(limit = 8, page = 0) {
    const query = this.studentService.getStudents(limit, page);
    const result = await lastValueFrom(query);
    this.students = result.students
    this.pagesQuantity = result.pagesQuantity
    this.totalItems = result.totalItems
  }

  goToStudent(code: number) {
    this.router.navigate([`student/${code}`])
  }
}
