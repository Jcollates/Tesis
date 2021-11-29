import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Provider } from '../../shared/models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  url: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = environment.API_URL;
  }

  getProviders(): Observable<Provider[]>{
    let url = this.url + '/providers';
    return this.http.get(url).pipe(map(res => res as Provider[] ));
  }
  saveProvider(container: Provider): Observable<any>{
    let url = this.url + '/createProvider';
    return this.http.post(url, container).pipe(map( res => res as any));

  }
}
