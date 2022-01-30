
export class Simplemeet{
    seqsimplemeet: number;
    dateService: Date;
    dateEnd: Date;
    address: string;
    datecreate: Date;
    datelastmodify: Date;
    cliName: string;
    cliLastName: string;
    cliDni: string;
    cliEmail: string;
    cliCity: string;
    cliProvince: string;
    typeService: number;
    services: string;
    hoursStimated: number;
    status: string;
    codeUser: number;
    tools: string;
    stimatedValue: number;
    phone: string;
    addededServices: string;
    //no persist
    elementAsArray: any;
    constructor(){
        this.datecreate = new Date();
        this.datelastmodify = new Date();
    }

}