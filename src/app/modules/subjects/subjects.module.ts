import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/core/shared/shared.module';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';

import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { SubjectsRoutingModule } from './subjects.routing.module';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';


@NgModule({
    declarations: [
        ListSubjectsComponent,
        CreateSubjectComponent,
        EditSubjectComponent

    ],
    imports: [
        SubjectsRoutingModule,
        CommonModule,
        SharedComponentModule,
        LoadingComponent
    ],
})
export class SubjectsModule { }
