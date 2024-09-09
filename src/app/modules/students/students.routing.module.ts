import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListStudentsComponent } from './list-students/list-students.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                data: { breadcrumb: 'Students' },
                component: ListStudentsComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class StudentsRoutingModule { }
