import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatServices } from '../../shared/models/catservices.model';

@Injectable({
  providedIn: 'root'
})
export class CatServiceService {
  url: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = environment.API_URL;
  }
  getCatServices(): Observable<CatServices[]>{
    let url = this.url + '/catservices';
    return this.http.get(url).pipe(map(res => res as CatServices[] ));
  }
  saveServicesCat(container: CatServices): Observable<any>{
    let url = this.url + '/createCatServices';
    return this.http.post(url, container).pipe(map( res => res as any));
  }
  
}
