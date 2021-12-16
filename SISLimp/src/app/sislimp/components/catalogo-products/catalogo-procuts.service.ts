import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatProducts } from '../../shared/models/catproduct.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogoProcutsService {
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  getCatProducts(): Observable<CatProducts[]>{
    let url = this.url + '/catproducts';
    return this.http.get(url).pipe(map(res => res as CatProducts[] ));
  }

  saveCatProducts(container: CatProducts): Observable<any>{
    let url = this.url + '/createCatpro';
    return this.http.post(url, container).pipe(map( res => res as any));

  }
  // getAuthorization(authorization: AuthorizationRequest): Observable<any>{
  //   let url = this.url + '/needAuthorization';
  //   return this._http.post(url, authorization).pipe(map(res => res as any));

  // }
  // saveUpdateDemographic( container :SocioDemographicMapsContainer): Observable<any>{
  //   let url = this.urlSolicitud + '/sociodemo';
  //   return this._http.post(url, container).pipe(map(res => res as any));
  // }

}
