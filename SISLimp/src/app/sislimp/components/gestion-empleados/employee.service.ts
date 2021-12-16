import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../../shared/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url: string;
  constructor(
    private http: HttpClient
  ) { 
    this.url = environment.API_URL;
  }

  getEmployess(): Observable<Employee[]>{
    let url = this.url + '/employ';
    return this.http.get(url).pipe(map(res => res as Employee[] ));
  }
  saveEmployee(container: Employee): Observable<any>{
    let url = this.url + '/createEmploy';
    return this.http.post(url, container).pipe(map( res => res as any));

  }
  updateEmployee(container: Employee): Observable<any>{
    let url = this.url + '/updatemeploy';
    return this.http.put(url, container).pipe(map( res => res as any));
  }
  getEmployessAssigned(): Observable<Employee[]>{
    let url = this.url + '/assignedEmploy';
    return this.http.get(url).pipe(map(res => res as Employee[] ));
  }
  getEmployesToBesAssigned(): Observable<Employee[]>{
    let url = this.url + '/toAssignedEmploy';
    return this.http.get(url).pipe(map(res => res as Employee[] ));
  }
}
