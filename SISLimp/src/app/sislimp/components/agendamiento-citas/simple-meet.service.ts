import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListAndCount } from '../../shared/models/listAndCountModel.model';
import { Simplemeet } from '../../shared/models/simplemeet.model';

@Injectable({
  providedIn: 'root'
})
export class SimpleMeetService {

  url: string
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }
  getSimpleMeets(): Observable<Simplemeet[]>{
    let url = this.url + '/simpleMeets';
    return this.http.get(url).pipe(map(res => res as Simplemeet[] ));
  }
  getSimpleMeetsHistory(page:number, pagesize: number): Observable<ListAndCount>{
    let url = this.url + `/simpleMeetHistory/${page}/${pagesize}`;
    return this.http.get(url).pipe(map(res => res as ListAndCount ));
  }
  saveCustomerService(container: Simplemeet): Observable<Simplemeet>{
    let url = this.url + '/saveSimpleMeet';
    return this.http.post(url, container).pipe(map( res => res as Simplemeet));
  }
  updateSimpleMeet(item: Simplemeet){
    let url = this.url + '/updateDataSimpleMeet';
    return this.http.post(url, item).pipe(map( res => res as Simplemeet));
  }
}
