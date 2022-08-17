import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@student-registration/api-interfaces';

@Component({
  selector: 'student-registration-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  menuOpened = false;
  constructor(private http: HttpClient) { }

  openMenu() {
    this.menuOpened = true;
  }
}
