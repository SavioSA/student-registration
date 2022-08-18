import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CourseFormRoutingModule } from './course-form-routing.module';
import { CourseFormComponent } from './course-form.component';
import { AddStudentDialogComponent } from './components/add-student-dialog/add-student-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CourseFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CourseFormComponent, AddStudentDialogComponent],
})
export class CourseFormModule {}
