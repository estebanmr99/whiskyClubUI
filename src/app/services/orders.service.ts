import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

// This is the service that is used to get sales history information.
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  // This is the method that is used to get the sales history information.
  getOrdersById(idUser: string): Observable<any> {
    return this.http.get<any>('http://localhost:3000/orders/getOrdersById/' + idUser);
  }
}
