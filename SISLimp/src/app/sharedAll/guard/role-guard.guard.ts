import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../serviceShared/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RoleGuardGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router
  ){

  }
  canActivate() {
    let role = localStorage.getItem('role');
    if(role == 'ADMIN'){
      // this.router.navigate(['/system']);
      return true;
    } else {
      console.log("you not a ADMIN");
      return false;
    }
  }
  canActivateChild() {
    let role = localStorage.getItem('role');
    if(role == 'ADMIN'){
      // this.router.navigate(['/system']);
      return true;
    } else {
      console.log("you not a ADMIN");
      return false;
    }
  }
  
}
