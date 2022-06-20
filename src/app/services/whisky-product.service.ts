import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';

// This is the service that is used to get all products to display in the products page.
@Injectable({
  providedIn: 'root'
})
export class WhiskyProductService {
  userValue: Boolean = false;

  constructor(private http: HttpClient) { }

  // This is the method that is used to get the product types.
  getProductTypes(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/product/getProductTypes');
  }

  // This is the method that is used to get the products.
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

