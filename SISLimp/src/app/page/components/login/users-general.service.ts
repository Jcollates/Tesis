import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { LoginUser, UserGeneralModel } from 'src/app/sharedAll/models/usergeneral.model';

@Injectable({
  providedIn: 'root'
})
export class UsersGeneralService {
  url: string
  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.API_URL;
  }

  getUserExtraData(id: number): Promise<UserGeneralModel> {
    let urlsend = this.url + `/users/${id.toString()}`;
    return this._http.get<UserGeneralModel>(urlsend).pipe(map(rest => rest as UserGeneralModel)).toPromise();
  }
  saveUser(container: UserGeneralModel): Promise<UserGeneralModel> {
    let urlsend = this.url + '/saveNewUser';
    return this._http.post<UserGeneralModel>(urlsend, container).pipe(map(rest => rest as UserGeneralModel)).toPromise();
  }
  createLoginUSer(container: LoginUser): Promise<LoginUser>{
    let urlsend = this.url + '/createUser';
    return this._http.post<LoginUser>(urlsend, container).pipe(map(rest => rest as LoginUser)).toPromise();
  }

  updateDataUser(container: UserGeneralModel): Promise<UserGeneralModel>{
    let urlsend = this.url + '/updateDataUser';
    return this._http.post<UserGeneralModel>(urlsend, container).pipe(map(rest => rest as UserGeneralModel)).toPromise();
  }
  updateLoginUSer(container: LoginUser): Promise<LoginUser>{
    let urlsend = this.url + '/updateLoginUSer';
    return this._http.post<LoginUser>(urlsend, container).pipe(map(rest => rest as LoginUser)).toPromise();
  }
}
