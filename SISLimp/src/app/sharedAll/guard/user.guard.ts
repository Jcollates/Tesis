import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  canActivate() {
    let role = localStorage.getItem('role');
    if(role == 'USER'){
      // this.router.navigate(['/system']);
      return true;
    } else {
      console.log("you not a USER");
      return false;
    }
  }
  
}
