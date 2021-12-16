
export class SolProduct{
    seqsolproduct: number;
    codeuser: number;
    products: string;
    nameuser: string;
    contacnumber: string;
    email: string;
    dateCreate: Date;
    status:string
    elementAsArray: any;
    constructor(){
        this.dateCreate = new Date();
    }
}