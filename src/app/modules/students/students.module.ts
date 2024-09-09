import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students.routing.module';
import { ListStudentsComponent } from './list-students/list-students.component';
import { SharedComponentModule } from 'src/app/core/shared/shared.module';
import { LoadingComponent } from 'src/app/core/components/loading/loading.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { SubjectsToStudentComponent } from './components/subjects-to-student/subjects-to-student.component';


@NgModule({
    declarations: [
        ListStudentsComponent,
        CreateStudentComponent,
        EditStudentComponent,
        SubjectsToStudentComponent

    ],
    imports: [
        StudentsRoutingModule,
        CommonModule,
        SharedComponentModule,
        LoadingComponent
    ],
})
export class StudentsModule { }
