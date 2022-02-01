import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../serviceShared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService) {

  }
  canActivate(): Observable<boolean> {
    // console.log(this.authService.userLogged.value)
    return this.authService.userLogged.pipe(
      take(1),
      map((islogged: boolean) => islogged)
    );
  }
  canActivateChild(): Observable<boolean> {
    return this.authService.userLogged.pipe(
      take(1),
      map((islogged: boolean) => islogged)
    );
  }
}
