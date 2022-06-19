import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrdersById(idUser: string): Observable<any> {
    const body = { };
    return this.http.get<any>('http://localhost:3000/orders/getOrdersById/' + idUser, body);
  }
}
