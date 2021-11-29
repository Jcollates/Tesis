
export class Provider{
    seqprovider: number;
    namenterprice: string;
    dni: string;
    email: string;
    location: string;
    province: string;
    city: string;
    phone: string;
    detail: string;
    paytype: string;
    salername: string;
    datecreate: Date;
    datelastmodify: Date;
    constructor(){
        this.datecreate = new Date();
        this.datelastmodify = new Date();
        
    }
}