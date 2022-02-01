import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolProduct } from 'src/app/page/components/sharedpage/models/solproduct.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  url: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = environment.API_URL;
  }
  getAllSolProducts(): Observable<SolProduct[]>{
    let url = this.url + `/solProducts`;
    return this.http.get(url).pipe(map(res => res as SolProduct[] ));
  }
  getSolProducts(codeUser: number): Observable<SolProduct[]>{
    let url = this.url + `/solProducts/${codeUser}`;
    return this.http.get(url).pipe(map(res => res as SolProduct[] ));
  }
  updateSolicitud(item: SolProduct){
    let url = this.url + '/updateSol';
    return this.http.post(url, item).pipe(map( res => res as SolProduct));
  }
}
