import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agreement } from '../../shared/models/agreements.model';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  url: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = environment.API_URL;
  }
  saveAgreement(container: Agreement): Observable<Agreement>{
    let url = this.url + '/addAgreements';
    return this.http.post(url, container).pipe(map( res => res as any));
  }

  getAgreements() : Observable<Agreement[]>{
    let url = this.url + '/agreements';
    return this.http.get(url).pipe(map(res => res as Agreement[] ));
  }
}
