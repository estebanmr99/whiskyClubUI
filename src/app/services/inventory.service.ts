import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  userValue: Boolean = false;

  constructor(private http: HttpClient) { }

  getStoresInfo(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/inventory/getStoresInfo');
  }

  getProductsInfo(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/inventory/getProductsInfo');
  }

  getAllStoresInventory(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/inventory/getAllStoresInventory');
  }

  updateStoreInventory(idStore: number, country: string, productFormInfo: FormGroup): Observable<any> {
    const body = {
      idStore: idStore,
      country: country,
      idProduct: productFormInfo.value.idProduct,
      currency: productFormInfo.value.currency,
      localPrice: productFormInfo.value.localPrice,
      globalPrice: productFormInfo.value.globalPrice,
      quantity: productFormInfo.value.inventory,
    };
    console.log(body);
    return this.http.put<any>('http://localhost:3000/inventory/updateStoreInventory', body);
  }
}
