import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { StudentService } from 'src/app/services/student.service';


@Component({
    selector: 'app-create-student',
    templateUrl: './create-student.component.html',
    styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
    loading: boolean = false;
    form: FormGroup;
    colBig: number = 12;
    colMedium: number = 12;
    colSmall: number = 12;
    minDate: Date = new Date();

    @Output() createSuccess: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        private breakpointObserver: BreakpointObserver,
        private _myRef: MatDialogRef<CreateStudentComponent>,
        private _formBuider: FormBuilder,
        private _studentService: StudentService,

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

    closeDialog() {
        this._myRef.close();
    }
    save() {
        this.loading = true;
        this._studentService
            .addStudent(
                this.form.value.name,
                this.form.value.last_name,
                this.form.value.years_old,
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
                    this.createSuccess.emit(true);
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
    ngOnInit() { }
}
