import { Subject } from "./subject.model";



export class Student {
    constructor(
        public id: number,
        public name: string,
        public last_name: string,
        public years_old: number,
        public total_credits: number,
        public Subjects?: Subject[]
    ) { }
}
