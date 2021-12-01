
export class CustomerServiceModel {
    seqcustomer: number;
    dnicliente: string;
    dateobservation: Date;
    nameclient: string;
    lastnameclient: string;
    observation: string;
    phonenumber: string;
    address: string;
    employeename: string;
    servicedetail: string;

    email: string;
    city: string;
    province: string;
    servicetype: string;
    codeemployee: string;
    servicedate: Date;

    constructor(){
        this.dateobservation = new Date();
    }
}