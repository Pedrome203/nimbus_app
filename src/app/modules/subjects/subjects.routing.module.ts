import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                data: { breadcrumb: 'Subjects' },
                component: ListSubjectsComponent,
            },
        ]),
    ],
    exports: [RouterModule],
})
export class SubjectsRoutingModule { }
