import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentModule } from 'src/app/core/shared/shared.module';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';

import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { SubjectsRoutingModule } from './subjects.routing.module';


@NgModule({
    declarations: [
        ListSubjectsComponent,

    ],
    imports: [
        SubjectsRoutingModule,
        CommonModule,
        SharedComponentModule,
        LoadingComponent
    ],
})
export class SubjectsModule { }
