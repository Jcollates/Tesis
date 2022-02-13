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
  deleteCatProduct(seqcatproducts: number): Observable<any>{
    let url = this.url + `/deleteCatProduct/${seqcatproducts}`;
    return this.http.delete(url).pipe(map( res => res as any));
  }
  updateCatProduct(container: CatProducts){
    let url = this.url + '/updateCatProduct';
    return this.http.post(url, container).pipe(map( res => res as any));
  }
}
