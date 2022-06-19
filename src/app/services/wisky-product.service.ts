import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WiskyProductService {
  userValue: Boolean = false;

  constructor(private http: HttpClient) { }

  getProductTypes(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/product/getProductTypes');
  }

  getAllProducts(searchQuery: string, idUser: number, idType: number, distance: number, price: number, order: string, country: string): Observable<any> {
    const body = {
      searchQuery: searchQuery,
      idUser: idUser,
      idType: idType,
      distance: distance,
      price: price,
      order: order,
      country: country,
    };
    return this.http.post<any>('http://localhost:3000/product/getAllProducts', body);
  }
}

