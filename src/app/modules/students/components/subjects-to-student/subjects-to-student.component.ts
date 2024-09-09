import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Input() loading: boolean = true;
    @Input() currentSubjects: Subject[] = [];  // Materias asignadas al estudiante
    @Input() id_student: number = 0;  // ID del estudiante
    @Output() subjectUpdated: EventEmitter<void> = new EventEmitter<void>();  // Evento que emitirá cada vez que se modifique una materia

    subjects: Subject[] = [];  // Todas las materias disponibles

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
            const assignedSubject = this.currentSubjects.find(s => s.id === subject.id);
            if (assignedSubject) {
                this.removeSubject(assignedSubject);
            }
        } else {
            this.addSubject(subject);
        }
    }

    addSubject(subject: Subject) {
        this.loading = true;
        this._studentService.addSubjectInStudent(this.id_student, subject.id).subscribe({
            next: (resp) => {
                this.subjectUpdated.emit();  // Emitimos el evento para indicar que se agregó una materia
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
                this.subjectUpdated.emit();  // Emitimos el evento para indicar que se eliminó una materia
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
