import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from './jwttoken.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor( //private loginService: LoginService,
              private authStorageService: LocalStorageService,
              private jwtService: JWTTokenService,
              private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
      if (this.jwtService.getToken() == null){
        this.jwtService.setToken(this.authStorageService.get('token'));
      }
      if (this.jwtService.getUserEmail()) {
          if (this.jwtService.getUserType() === 1) {
            console.log('UserGuard: canActivate: true');
            return true;
          } else {
            return false;
          }
      }
      else {
        return this.router.navigate(['/country']);
      }
  }
}
