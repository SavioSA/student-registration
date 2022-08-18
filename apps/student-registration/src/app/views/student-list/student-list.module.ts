import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { StudentListRoutingModule } from './student-list-routing.module';
import { StudentListComponent } from './student-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    StudentListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [StudentListComponent],
})
export class StudentListModule {}
