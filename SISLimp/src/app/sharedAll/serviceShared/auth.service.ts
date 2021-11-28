import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user.interfa';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLogged = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {
    this.checktoken();
  }
  getIslogged(): Observable<boolean> {
    return this.userLogged.asObservable();
  }

  login(authData: User): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/login`, authData).pipe(map(res => {
      // console.log('REST LOGIN', res);
      this.saveToken(res.token, res.loginusercol);
      this.userLogged.next(true);
      return res

    }),
      catchError(error => this.handleError(error))
    );
  }
  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.userLogged.next(false);
  }
  private checktoken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired', isExpired);
    if(isExpired){
      this.logOut();
    } else {
      this.userLogged.next(true);
    }
    // setear userlogged = isExpired
  }
  private saveToken(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role)
  }
  private handleError(error): Observable<never> {

    let errorMessage = 'An error occurred retriving data';
    if (error) {
      errorMessage = `Error: code ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }
}
