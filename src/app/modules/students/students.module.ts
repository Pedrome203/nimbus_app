import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students.routing.module';
import { ListStudentsComponent } from './list-students/list-students.component';
import { SharedComponentModule } from 'src/app/core/shared/shared.module';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';


@NgModule({
    declarations: [
        ListStudentsComponent,

    ],
    imports: [
        StudentsRoutingModule,
        CommonModule,
        SharedComponentModule,
        LoadingComponent
    ],
})
export class StudentsModule { }
