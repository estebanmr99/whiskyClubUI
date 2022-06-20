import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from './jwttoken.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router'

// This is the guard service. It is used to check if the user is external or not.
@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
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
          if (this.jwtService.getUserType() === 1) { // 1 is the user type for external user.
            console.log('UserGuard: canActivate: true');
            return true;
          } else { // 0 is the user type for admin.
            return false;
          }
      }
      else {
        return this.router.navigate(['/country']);
      }
  }
}
