import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MaterialModule } from './material.module';
import { CourseListModule } from './views/course-list/course-list.module';
import { IntialPageComponent } from './views/intial-page/intial-page.component';
import { StudentFormModule } from './views/student-form/student-form.module';
import { StudentListModule } from './views/student-list/student-list.module';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    IntialPageComponent,
    DialogConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    StudentFormModule,
    StudentListModule,
    CourseListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
