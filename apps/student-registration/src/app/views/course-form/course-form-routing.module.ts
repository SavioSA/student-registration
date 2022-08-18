import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './course-form.component';

const routes: Routes = [
  {
    path: 'new',
    component: CourseFormComponent,
  },
  {
    path: ':code',
    component: CourseFormComponent,
  },
  {
    path: '**',
    redirectTo: 'new'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseFormRoutingModule {

}
