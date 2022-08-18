import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './student-form.component';

const routes: Routes = [
  {
    path: 'new',
    component: StudentFormComponent,
  },
  {
    path: ':code',
    component: StudentFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentFormRoutingModule {

}
