export class BasicEmailModel {
    emailTo: string;
    emailFrom: string;
    subject: string;
    preheader: string;
    password: string;
    username: string;
    companyname: string;
    requestdate: string;
    supportemail: string;
    status: string;
    request: string;
    message: string;
    contactEmail: string
    name: string;
    constructor(){
        this.requestdate = new Date().toString();
        this.companyname = 'SisLimp Inc.';
        this.supportemail = 'soport@soportesislimp.com';
    }
}