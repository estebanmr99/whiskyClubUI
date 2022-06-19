import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import { JWTTokenService } from './jwttoken.service';
import { LocalStorageService } from './local-storage.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userValue: Boolean = false;

  constructor(private http: HttpClient, private jwtService: JWTTokenService, private localStorageService: LocalStorageService) { }

  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post<any>('http://localhost:3000/user/login', body);
  }

  subscription(idUser: string, idLevel: string,country:string): Observable<any> {
    const body = { idUser: idUser, idLevel: idLevel,country:country };
    return this.http.post<any>('http://localhost:3000/user/subscription', body);
  }

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

  isTokenExpired() {
    return this.jwtService.isTokenExpired();
  }

  logout() {
    this.userValue = false;
    this.jwtService.removeToken();
    this.localStorageService.remove('token');
    this.localStorageService.remove('country');
  }
}
