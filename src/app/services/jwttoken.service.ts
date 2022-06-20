import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

// This is the service that is used to get the user information from the token saved in localstorage.
@Injectable()
export class JWTTokenService {
  jwtToken: string;
  decodedToken: { [key: string]: string };

  constructor() {
  }

  // This is the method that is used to set the user information with the token.
  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  // This is the method to removed the token.
  removeToken() {
    if (this.jwtToken) {
      this.jwtToken = null;
    }
  }

  // This is the method to decode the token.
  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  // This is the method to get the user type from the token.
  getToken() {
    return this.jwtToken;
  }

  // Get all the user information from the token.
  getDecodeToken() {
    return jwt_decode(this.jwtToken);
  }

  // Get the user email from the token.
  getUserEmail() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.email : null;
  }

  // Get the user id from the token.
  getId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken._id : null;
  }

  // Get the user type from the token.
  getUserType() {
    this.decodeToken();
    return this.decodedToken ? +this.decodedToken._idUserType : null;
  }

  // Check when the token is going to expire.
  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? +this.decodedToken.exp : 0;
  }

  // Check if the token has expired.
  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
