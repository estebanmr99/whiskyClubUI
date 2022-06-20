import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { JWTTokenService } from './jwttoken.service';
import { Observable } from 'rxjs';

// This is the service that is used to intercept the requests.
@Injectable({
  providedIn: 'root'
})
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor( private authService: JWTTokenService) { }

  // This is the method that is used to intercept the requests and add the token to all of them to indicate that the user is logged in.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `JWT ${token}`
      }
    });
    return next.handle(req);
  }
}
