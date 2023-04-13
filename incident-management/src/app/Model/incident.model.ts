export class Incident{
    constructor(
        public state:string,
        public priority:string,
        public type:string,
        public custname: string,
        public custcontact: string,
        public created: Date,
        public createdby: string,
        public description:string,
        public number: string,
        public resolved?:Date,
        public resolvedby?:string,
        public _id?: number,
    ){}
}
