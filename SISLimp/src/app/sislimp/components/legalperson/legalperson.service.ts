import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LegalPerson } from '../../shared/models/legalperson.model';

@Injectable({
  providedIn: 'root'
})
export class LegalpersonService {

  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  saveLegalPerson(container:LegalPerson): Observable<LegalPerson>{
    let url = this.url + '/addLegalperson';
    return this.http.post(url, container).pipe(map( res => res as LegalPerson));
  }
}
