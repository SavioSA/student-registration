import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import MessageInterface from '../interfaces/message.interface';
import StudentInterface from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  url='http://localhost:3000/api/v1/student';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  registerStudent(student: StudentInterface): Observable<StudentInterface> {
    return this.http.post<StudentInterface>(this.url, student).pipe(
      catchError((error) => {
        this.showError(error.message)
        return throwError(() => error);
      })
    );
  }

  updateStudent(code: number, student: StudentInterface): Observable<MessageInterface> {
    return this.http.put<MessageInterface>(`${this.url}/${code}`, student).pipe(
      catchError((error) => {
        this.showError(error.message)
        return throwError(() => error);
      })
    );
  }

  getStudent(code: number) {
    return this.http.get<StudentInterface>(`${this.url}/${code}`).pipe(
      catchError((error) => {
        this.showError(error.message)
        return throwError(() => error);
      })
    );
  }

  showError(msg: string) {
    this._snackBar.open(msg, 'OK');
  }
}
