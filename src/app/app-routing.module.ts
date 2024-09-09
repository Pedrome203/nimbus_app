import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/subjects', pathMatch: 'full' },
  {
    path: 'students',
    loadChildren: () =>
      import('./modules/students/students.module').then((x) => x.StudentsModule),
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./modules/subjects/subjects.module').then((x) => x.SubjectsModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }