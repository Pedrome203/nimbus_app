import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Student } from '../models/student.model';


const base_url = environment.base_url;

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    constructor(private http: HttpClient) { }

    get path(): string {
        return 'students';
    }
    get headers() {
        return {
            headers: {
            },
        };
    }

    addStudent(
        name: string,
        last_name: string,
        years_old: number,
    ) {
        const url = `${base_url}/${this.path}/`;
        console.log(url)
        return this.http
            .post(url, { name, last_name, years_old }, this.headers)
            .pipe(map((resp: any) => resp.message));
    }

    updateStudent(
        id: number,
        name: string,
        last_name: string,
        years_old: number,) {
        const url = `${base_url}/${this.path}/${id}`;
        return this.http
            .put(url, { name, last_name, years_old }, this.headers)
            .pipe(map((resp: any) => resp.message));
    }

    deletEvent(id: number) {
        const url = `${base_url}/${this.path}/${id}`;
        return this.http
            .delete(url, this.headers)
            .pipe(map((resp: any) => resp.message));
    }

    getStudents() {
        const url = `${base_url}/${this.path}/all`;
        return this.http
            .get<Student[]>(url, this.headers)
            .pipe(map((resp: any) => resp.data));
    }

    getStudent(id: number) {
        const url = `${base_url}/${this.path}/${id}`;
        return this.http
            .get<Student>(url, this.headers)
            .pipe(map((resp: any) => resp.data));
    }
}
