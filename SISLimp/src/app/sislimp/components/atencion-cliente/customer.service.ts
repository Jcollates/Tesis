import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerServiceModel } from '../../shared/models/customerservice.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url: string
  constructor(
    private http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  getCustomerService(): Observable<CustomerServiceModel[]>{
    let url = this.url + '/getCustomerSer';
    return this.http.get(url).pipe(map(res => res as CustomerServiceModel[] ));
  }

  saveCustomerService(container: CustomerServiceModel): Observable<any>{
    let url = this.url + '/addCustomerSer';
    return this.http.post(url, container).pipe(map( res => res as any));

  }
  deleteCustomer(seqcustomer: number): Observable<any>{
    let url = this.url + `/deleteCustomer/${seqcustomer}`;
    return this.http.delete(url).pipe(map( res => res as any));

  }
}
