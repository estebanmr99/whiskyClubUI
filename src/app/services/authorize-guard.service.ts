import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from './jwttoken.service';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router'

// This is the guard service. It is used to check if the user is logged in or not.
@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
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
          if (this.jwtService.isTokenExpired()) { // If the token is expired, then redirect to login page.
            this.router.navigate(['/country']);
            // Should Redirect Sig-In Page
          } else { // If the token is not expired, then redirect to the home page.
            return true;
          }
      }
      else {
        return this.router.navigate(['/country']);
      }
  }
}
