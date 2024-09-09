import { Component, Input } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { StudentService } from 'src/app/services/student.service';
import { SubjectService } from 'src/app/services/subject.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-subjects-to-student',
    templateUrl: './subjects-to-student.component.html',
    styleUrls: ['./subjects-to-student.component.scss'],
})
export class SubjectsToStudentComponent {
    @Input() currentSubjects: Subject[] = [];
    @Input() id_student: number = 0;
    loading: boolean = true;
    subjects: Subject[] = [];

    constructor(private _subjectService: SubjectService, private _studentService: StudentService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loading = true;
        this._subjectService.getSubjects().subscribe({
            next: (subjects) => {
                this.subjects = subjects;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load subjects', err);
                this.loading = false;
            },
        });
    }

    getIcon(subject: Subject): string {
        return this.currentSubjects.some(s => s.id === subject.id) ? 'check_box' : 'check_box_outline_blank';
    }

    validateSubject(subject: Subject) {
        const isSubjectAssigned = this.currentSubjects.some(s => s.id === subject.id);
        if (isSubjectAssigned) {
            this.removeSubject(subject);
        } else {
            this.addSubject(subject);
        }
    }

    addSubject(subject: Subject) {
        this.loading = true;
        this._studentService.addSubjectInStudent(this.id_student, subject.id).subscribe({
            next: (resp) => {

            },
            complete: () => {
                this.loading = false;
            },
            error: (err) => {
                Swal.fire({
                    title: 'ERROR',
                    text: err.error.message,
                    icon: 'error',
                    confirmButtonColor: '#58B1F7',
                    heightAuto: false,
                });
                this.loading = false;
            },
        });
    }

    removeSubject(subject: Subject) {
        this.loading = true;
        this._studentService.removeSubjectInStudent(subject.StudentSubject?.id!).subscribe({
            next: (resp) => {

            },
            complete: () => {
                this.loading = false;
            },
            error: (err) => {
                Swal.fire({
                    title: 'ERROR',
                    text: err.error.message,
                    icon: 'error',
                    confirmButtonColor: '#58B1F7',
                    heightAuto: false,
                });
                this.loading = false;
            },
        });
    }
}
