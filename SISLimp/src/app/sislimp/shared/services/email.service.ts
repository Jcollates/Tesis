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
}
