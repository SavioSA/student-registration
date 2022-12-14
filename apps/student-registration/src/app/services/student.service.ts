import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import MessageInterface from '../interfaces/message.interface';
import StudentInterface from '../interfaces/student.interface';
import StudentsPaginatedInterface from '../interfaces/students-paginated.inteface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  url = 'http://localhost:3000/api/v1/student';
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  registerStudent(student: StudentInterface): Observable<StudentInterface> {
    return this.http.post<StudentInterface>(this.url, student).pipe(
      catchError((error) => {
        this.handleError(error.message);
        return throwError(() => error);
      })
    );
  }

  updateStudent(
    code: number,
    student: StudentInterface
  ): Observable<MessageInterface> {
    return this.http.put<MessageInterface>(`${this.url}/${code}`, student).pipe(
      catchError((error) => {
        this.handleError(error.message);
        return throwError(() => error);
      })
    );
  }

  getStudent(code: number): Observable<StudentInterface> {
    return this.http.get<StudentInterface>(`${this.url}/${code}`).pipe(
      catchError((error) => {
        this.router.navigate([`/`]);
        this.handleError(error.message);
        return throwError(() => error);
      })
    );
  }

  getStudents(limit = 7, page = 0): Observable<StudentsPaginatedInterface> {
    return this.http
      .get<StudentsPaginatedInterface>(
        `${this.url}?limit=${limit}&page=${page}`
      )
      .pipe(
        catchError((error) => {
          this.handleError(error.message);
          return throwError(() => error);
        })
      );
  }

  deleteStudent(code: number): Observable<MessageInterface> {
    return this.http.delete<MessageInterface>(`${this.url}/${code}`).pipe(
      catchError((error) => {
        this.handleError(error.message);
        return throwError(() => error);
      })
    );
  }

  registerStudentInACourse(studentCode: number, courseCode: number) {
    return this.http
      .post<MessageInterface>(`${this.url}/${studentCode}/courses`, {
        courseCode,
      })
      .pipe(
        catchError((error) => {
          this.handleError(error.message);
          return throwError(() => error);
        })
      );
  }

  removeStudentFromACourse(studentCode: number, courseCode: number) {
    return this.http
      .delete<MessageInterface>(
        `${this.url}/${studentCode}/courses/${courseCode}`,
        {}
      )
      .pipe(
        catchError((error) => {
          this.handleError(error.message);
          return throwError(() => error);
        })
      );
  }

  handleError(msg: string) {
    this._snackBar.open(msg, 'OK');
  }
}
