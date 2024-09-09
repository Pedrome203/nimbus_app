import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';





import Swal from 'sweetalert2';
@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html',
    styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
    loading: boolean = false;
    form: FormGroup;
    colBig: number = 12;
    colMedium: number = 12;
    colSmall: number = 12;
    student!: Student;

    @Output() updateSuccess: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    constructor(
        @Inject(MAT_DIALOG_DATA) public id_student: number,
        private breakpointObserver: BreakpointObserver,
        private _myRef: MatDialogRef<EditStudentComponent>,
        private _formBuider: FormBuilder,
        private _studentService: StudentService
    ) {
        this.breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .subscribe((result) => {
                if (result.matches) {
                    if (result.breakpoints[Breakpoints.XSmall]) {
                        this.colBig = 12;
                        this.colMedium = 12;
                        this.colSmall = 12;
                    }
                    if (result.breakpoints[Breakpoints.Small]) {
                        this.colBig = 12;
                        this.colMedium = 12;
                        this.colSmall = 6;
                    }
                    if (result.breakpoints[Breakpoints.Medium]) {
                        this.colBig = 12;
                        this.colMedium = 6;
                        this.colSmall = 4;
                    }
                    if (result.breakpoints[Breakpoints.Large]) {
                        this.colBig = 12;
                        this.colMedium = 6;
                        this.colSmall = 4;
                    }
                    if (result.breakpoints[Breakpoints.XLarge]) {
                        this.colBig = 12;
                        this.colMedium = 6;
                        this.colSmall = 4;
                    }
                }
            });
        this.form = this._formBuider.group({
            name: ['', Validators.required],
            last_name: ['', Validators.required],
            years_old: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],

        });
    }

    setFeilds() {
        this.form.controls['name'].setValue(this.student.name);
        this.form.controls['last_name'].setValue(this.student.last_name);
        this.form.controls['years_old'].setValue(this.student.years_old);

    }

    loadData() {
        this.loading = true;
        this._studentService.getStudent(this.id_student).subscribe({
            next: (resp) => {
                this.student = { ...resp };
            },
            complete: () => {
                this.setFeilds();
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
                this.updateSuccess.emit(false);
            },
        });
    }

    save() {
        this.loading = true;
        this._studentService
            .updateStudent(
                this.id_student,
                this.form.value.name,
                this.form.value.last_name,
                this.form.value.years_old
            )
            .subscribe({
                next: (resp) => {
                    console.log(resp);
                    Swal.fire({
                        title: 'OK',
                        text: resp,
                        icon: 'success',
                        confirmButtonColor: '#58B1F7',
                        heightAuto: false,
                    });
                },
                complete: () => {
                    this.loading = false;
                    this.updateSuccess.emit(true);
                    this.loadData();
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

    closeDialog() {
        this._myRef.close();
    }

    ngOnInit() {
        this.loadData();
    }
}
