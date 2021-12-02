import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatProducts } from 'src/app/sislimp/shared/models/catproduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProoductShowService {

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

}
