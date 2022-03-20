import { Injectable } from '@angular/core';
import { UsersGeneralService } from '../../../page/components/login/users-general.service';
import { LoginUser } from '../../../sharedAll/models/usergeneral.model';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  loginUsers: LoginUser[] = [];
  constructor(
    private userService: UsersGeneralService
  ) { }
  async getLoginUsers(): Promise<LoginUser[]>{
    
     await this.userService.getLoginUsers(localStorage.getItem('role')).then(rest => {
      if (rest.hasOwnProperty('message')) {
        console.log("ERROR, no trajo usuarios");
      } else {
        this.loginUsers = rest;
        return this.loginUsers;
      }
    });
    return this.loginUsers;
  }
  
}
