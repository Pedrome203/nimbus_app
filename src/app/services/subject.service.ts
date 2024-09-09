import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Subject } from '../models/subject.model';



const base_url = environment.base_url;

@Injectable({
    providedIn: 'root',
})
export class SubjectService {
    constructor(private http: HttpClient) { }

    get path(): string {
        return 'subjects';
    }
    get headers() {
        return {
            headers: {
            },
        };
    }

    addSubject(
        name: string,
        credits: number,
    ) {
        const url = `${base_url}/${this.path}/`;
        return this.http
            .post(url, { name, credits }, this.headers)
            .pipe(map((resp: any) => resp.message));
    }

    updateSubject(
        id: number,
        name: string,
        credits: number,) {
        const url = `${base_url}/${this.path}/${id}`;
        return this.http
            .put(url, { name, credits }, this.headers)
            .pipe(map((resp: any) => resp.message));
    }

    deleteSubject(id: number) {
        const url = `${base_url}/${this.path}/${id}`;
        return this.http
            .delete(url, this.headers)
            .pipe(map((resp: any) => resp.message));
    }

    getSubjects() {
        const url = `${base_url}/${this.path}/all`;
        return this.http
            .get<Subject[]>(url, this.headers)
            .pipe(map((resp: any) => resp.data));
    }

    getSubject(id: number) {
        const url = `${base_url}/${this.path}/${id}`;
        return this.http
            .get<Subject>(url, this.headers)
            .pipe(map((resp: any) => resp.data));
    }
}
