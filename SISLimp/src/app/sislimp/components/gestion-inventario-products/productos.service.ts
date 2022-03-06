import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from '../../shared/models/products.model';
import { SelectItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string;
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  getProducts(): Observable<ProductModel[]>{
    let url = this.url + '/products';
    return this.http.get(url).pipe(map(res => res as ProductModel[] ));
  }
  saveProducts(container: ProductModel): Observable<ProductModel>{
    let url = this.url + '/addProducts';
    return this.http.post(url, container).pipe(map( res => res as ProductModel));

  }
  getEspecifict(codeprod: string): Promise<ProductModel>{
    let url = this.url + `/getUniqueProduct/${codeprod}`;
    return this.http.get(url).pipe(map(res => res as ProductModel )).toPromise();;
  }
  deleteProducts(id: number): Observable<any>{
    let url = this.url + `/deleteProducts/${id}`;
    return this.http.delete(url).pipe(map( res => res as any));
  }
  updateProducts(container: ProductModel){
    let url = this.url + '/updateProducts';
    return this.http.post(url, container).pipe(map( res => res as any));
  }
  constructModel(list: ProductModel[]) {
    const comboItems: SelectItem[] = [];
    comboItems.push({ label: 'Seleccione', value: '' });
    return comboItems.concat(list.map(value => ({
      label: `${value.codeproduct} -  ${value.name}`,
      value: value.codeproduct
    })));
  }
}
