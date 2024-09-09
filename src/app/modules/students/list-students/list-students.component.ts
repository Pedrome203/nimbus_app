import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { CreateStudentComponent } from '../create-student/create-student.component';
import Swal from 'sweetalert2';
import { EditStudentComponent } from '../edit-student/edit-student.component';


@Component({
  selector: 'app-list-songs',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
})
export class ListStudentsComponent implements OnInit {
  loading: boolean = true;
  colBig: number = 12;
  colMedium: number = 12;
  colSmall: number = 12;
  modalWidth: string = '100%';
  modalWidthForViews: string = '100%';
  students: Student[] = [];
  displayedColumns: string[] = [
    'name',
    'last_name',
    'years_old',
    'total_credits',
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  dataSource!: MatTableDataSource<Student>;
  constructor(
    private _dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
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
            this.modalWidthForViews = '100%';
            this.modalWidth = '100%';
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.colBig = 12;
            this.colMedium = 12;
            this.colSmall = 6;
            this.modalWidthForViews = '100%';

            this.modalWidth = '85%';
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.colBig = 12;
            this.colMedium = 4;
            this.colSmall = 4;
            this.modalWidthForViews = '85%';

            this.modalWidth = '65%';
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.colBig = 6;
            this.colMedium = 4;
            this.colSmall = 2;
            this.modalWidthForViews = '75%';

            this.modalWidth = '45%';
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.colBig = 6;
            this.colMedium = 4;
            this.colSmall = 2;
            this.modalWidthForViews = '50%';

            this.modalWidth = '33%';
          }
        }
      });
  }

  create() {
    const createSongDialogRef = this._dialog.open(CreateStudentComponent, {
      width: this.modalWidth,
      height: 'auto',
    });
    createSongDialogRef.componentInstance.createSuccess.subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.loadData();
        }
      }
    );
  }

  update(student: Student) {
    const updateSongDialogRef = this._dialog.open(EditStudentComponent, {
      width: this.modalWidth,
      height: 'auto',
      data: student.id,
    });
    updateSongDialogRef.componentInstance.updateSuccess.subscribe(
      (response) => {

        if (response) {
          this.loadData();
        }
      }
    );
  }


  delete(student: Student) {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Esta seguro de eliminar al estudiante ' + student.name + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#58B1F7',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this._studentService.deleteStudent(student.id).subscribe({
          next: (resp) => {
            Swal.fire({
              title: 'OK',
              text: resp,
              icon: 'success',
              confirmButtonColor: '#58B1F7',
              heightAuto: false,
            });
          },
          complete: () => {
            this.loadData();
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              title: 'ERROR',
              text: err.error.message,
              icon: 'error',
              confirmButtonColor: '#58B1F7',
              heightAuto: false,
            });
          },
        });
      }
    });
  }
  loadData() {
    this.loading = true;
    this._studentService.getStudents()
      .subscribe({
        next: (resp) => {
          this.students = [...resp];
          this.dataSource = new MatTableDataSource(this.students);
        },
        complete: () => {
          this.dataSource.sort = this.sort;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
        },
      });
  }

  ngOnInit() {
    this.loadData();
  }
}
