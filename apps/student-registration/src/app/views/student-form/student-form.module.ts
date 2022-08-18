import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { StudentFormRoutingModule } from './student-form-routing.module';
import { StudentFormComponent } from './student-form.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StudentFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [StudentFormComponent],
})
export class StudentFormModule {}
