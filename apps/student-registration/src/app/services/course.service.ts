import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
import CourseInterface from '../interfaces/course.interface';
import CoursesPaginatedInterface from '../interfaces/courses-paginated.inteface';
import MessageInterface from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  url='http://localhost:3000/api/v1/course';
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  registerCourse(course: CourseInterface): Observable<CourseInterface> {
    return this.http.post<CourseInterface>(this.url, course).pipe(
      catchError((error) => {
        this.showError(error.message)
        return throwError(() => error);
      })
    );
  }

  updateCourse(code: number, course: CourseInterface): Observable<MessageInterface> {
    return this.http.put<MessageInterface>(`${this.url}/${code}`, course).pipe(
      catchError((error) => {
        this.showError(error.message)
        return throwError(() => error);
      })
    );
  }

  getCourse(code: number): Observable<CourseInterface> {
    return this.http.get<CourseInterface>(`${this.url}/${code}`).pipe(
      catchError((error) => {
        this.showError(error.message)
        return throwError(() => error);
      })
    );
  }

  getCourses(limit = 7, page = 0): Observable<CoursesPaginatedInterface> {
    return this.http.get<CoursesPaginatedInterface>(`${this.url}?limit=${limit}&page=${page}`).pipe(
      catchError((error) => {
        this.showError(error.message)
        return throwError(() => error);
      })
    );
  }

  deleteCourse(code: number): Observable<MessageInterface> {
    return this.http.delete<MessageInterface>(`${this.url}/${code}`).pipe(
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
