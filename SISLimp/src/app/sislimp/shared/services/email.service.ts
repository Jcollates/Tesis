import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { BasicEmailModel } from '../models/emails.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  url: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = environment.API_URL;
  }
  sendRestorePasswordEmail(restorePassWord: BasicEmailModel): Promise<any>{
    let url = this.url + `/api/sendEmail`;
    return this.http.post(url, restorePassWord).pipe(map(res => res as any )).toPromise();
  }
  sendNewGenericPassEmail(restorePassWord: BasicEmailModel): Promise<any>{
    let url = this.url + `/api/sendEmailNewGeneric`;
    return this.http.post(url, restorePassWord).pipe(map(res => res as any )).toPromise();
  }




  sendNewRequestToUSER(restorePassWord: BasicEmailModel): Promise<any>{
    let url = this.url + `/api/sendNewRequestToUSER`;
    return this.http.post(url, restorePassWord).pipe(map(res => res as any )).toPromise();
  }
  sendNewRequestToAdmin(restorePassWord: BasicEmailModel): Promise<any>{
    let url = this.url + `/api/sendNewRequestToAdmin`;
    return this.http.post(url, restorePassWord).pipe(map(res => res as any )).toPromise();
  }
  sendChangedRequestToUser(restorePassWord: BasicEmailModel): Promise<any>{
    let url = this.url + `/api/sendChangedRequestToUser`;
    return this.http.post(url, restorePassWord).pipe(map(res => res as any )).toPromise();
  }

  sendContactForm(contactForm: BasicEmailModel): Promise<any>{
    let url = this.url + `/api/sendContactForm`;
    return this.http.post(url, contactForm).pipe(map(res => res as any )).toPromise();
  }
}
