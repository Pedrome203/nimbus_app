import { StudentSubject } from "./student_subject.modelt";

export class Subject {
    constructor(
        public id: number,
        public name: string,
        public credits: number,
        public StudentSubject?: StudentSubject
    ) { }
}
