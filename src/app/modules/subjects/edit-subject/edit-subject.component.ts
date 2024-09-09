import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/services/subject.service';




import Swal from 'sweetalert2';
@Component({
    selector: 'app-edit-subject',
    templateUrl: './edit-subject.component.html',
    styleUrls: ['./edit-subject.component.scss'],
})
export class EditSubjectComponent implements OnInit {
    loading: boolean = false;
    form: FormGroup;
    colBig: number = 12;
    colMedium: number = 12;
    colSmall: number = 12;

    subject!: Subject;

    @Output() updateSuccess: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    constructor(
        @Inject(MAT_DIALOG_DATA) public id_subject: number,
        private breakpointObserver: BreakpointObserver,
        private _myRef: MatDialogRef<EditSubjectComponent>,
        private _formBuider: FormBuilder,
        private _subjectService: SubjectService
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
            credits: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],

        });
    }

    setFeilds() {

        this.form.controls['name'].setValue(this.subject.name);
        this.form.controls['credits'].setValue(this.subject.credits);

    }

    loadData() {
        this.loading = true;
        this._subjectService.getSubject(this.id_subject).subscribe({
            next: (resp) => {
                this.subject = { ...resp };

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
        if (this.form.value.name == this.subject.name && this.form.value.credits == this.subject.credits) {
            Swal.fire({
                title: 'Erro',
                text: 'No haz editado ningun campo',
                icon: 'error',
                confirmButtonColor: '#58B1F7',
                heightAuto: false,
            });
        } else {
            this.loading = true;
            this._subjectService
                .updateSubject(
                    this.id_subject,
                    this.form.value.name,
                    this.form.value.credits
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

    }

    closeDialog() {
        this._myRef.close();
    }

    ngOnInit() {
        this.loadData();
    }
}
