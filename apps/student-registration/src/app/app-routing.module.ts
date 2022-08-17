import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntialPageComponent } from './views/intial-page/intial-page.component';

const routes: Routes = [
  {
    path: '',
    component: IntialPageComponent

  },
  {
    path: 'student',
    loadChildren: ()=> import('./views/student-form/student-form.module').then((c)=> c.StudentFormModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
