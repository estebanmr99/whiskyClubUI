import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import jwt_decode  from 'jwt-decode';

@Injectable()
export class JWTTokenService {

    jwtToken: string;
    decodedToken: { [key: string]: string };

    constructor() {
    }

    setToken(token: string) {
      if (token) {
        this.jwtToken = token;
      }
    }

    removeToken() {
      if (this.jwtToken) {
        this.jwtToken = null;
      }
    }

    decodeToken() {
      if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
      }
    }

    getToken() {
      return this.jwtToken;
    }

    getDecodeToken() {
      return jwt_decode(this.jwtToken);
    }

    getUserEmail() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken.email : null;
    }

    getId() {
      this.decodeToken();
      return this.decodedToken ? this.decodedToken._id : null;
    }

    getUserType() {
      this.decodeToken();
      return this.decodedToken ? +this.decodedToken._idUserType : null;
    }

    getExpiryTime() {
      this.decodeToken();
      return this.decodedToken ? +this.decodedToken.exp : 0;
    }

    isTokenExpired(): boolean {
      const expiryTime: number = this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }
    }
}
