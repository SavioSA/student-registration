import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { StudentFormRoutingModule } from './course-form-routing.module';
import { CourseFormComponent } from './course-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StudentFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CourseFormComponent],
})
export class CourseFormModule {}
