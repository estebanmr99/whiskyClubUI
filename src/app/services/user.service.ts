import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import { JWTTokenService } from './jwttoken.service';
import { LocalStorageService } from './local-storage.service';
import { FormGroup } from '@angular/forms';

// This is the service that is used to maintain user information.
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userValue: Boolean = false;

  constructor(private http: HttpClient, private jwtService: JWTTokenService, private localStorageService: LocalStorageService) { }

  // This is the method that is used to login the user.
  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post<any>('http://localhost:3000/user/login', body);
  }

  // This is the method that is used to add to the user a suscription.
  addSubscription(idUser: string, idLevel: string,country:string): Observable<any> {
    const body = { idUser: idUser, idLevel: idLevel, country:country };
    return this.http.post<any>('http://localhost:3000/user/addSubscription', body);
  }

  // This is the method that is used to register a user.
  register(userFormInfo: FormGroup, userDeliveryPosition: any): Observable<any> {
    const body = {
      email: userFormInfo.value.email,
      password: userFormInfo.value.password,
      telephone: userFormInfo.value.telephone,
      name: userFormInfo.value.name,
      lastName: userFormInfo.value.lastName,
      positionLat: userDeliveryPosition.lat,
      positionLng: userDeliveryPosition.lng,
      country: this.localStorageService.get('country'),
    };
    return this.http.post<any>('http://localhost:3000/user/auth/register', body);
  }

  // This is the method to get if token is valid.
  isTokenExpired() {
    return this.jwtService.isTokenExpired();
  }

  // This is the method to logout the user.
  logout() {
    this.userValue = false;
    this.jwtService.removeToken();
    this.localStorageService.remove('token');
    this.localStorageService.remove('country');
  }
}
