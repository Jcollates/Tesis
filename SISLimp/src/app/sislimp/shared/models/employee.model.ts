
export class Employee {
    seqemploy: number;
    dni: string;
    name: string;
    lastname: string;
    position: string;
    birthday: string;
    assigmentdayte: Date;
    img: any;
    datelastmodify: Date;
    datecreate: Date;
    contractday: string;
    constructor(){
        this.datecreate = new Date();
        this.datelastmodify = new Date();
    }

}