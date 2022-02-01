import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SolProduct } from 'src/app/page/components/sharedpage/models/solproduct.model';

@Injectable({
  providedIn: 'root'
})
export class OdersService {

  url: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = environment.API_URL;
  }
  getSolProducts(codeUser: number): Observable<SolProduct[]>{
    let url = this.url + `/solProducts/${codeUser}`;
    return this.http.get(url).pipe(map(res => res as SolProduct[] ));
  }
}
