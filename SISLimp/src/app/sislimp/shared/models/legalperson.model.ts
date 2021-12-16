
export class LegalPerson{
    seqlegalperson: number;
    dni: string;
    name: string;
    lastname: string;
    position: string;
    homeadrees: string;
    phonenumber: string;
    datecreate: Date;
    datelastmodify: Date;
    constructor(){
        this.datecreate = new Date();
        this.datelastmodify = new Date();
    }
}