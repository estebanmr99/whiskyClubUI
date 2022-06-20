import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import { FormGroup } from '@angular/forms';

// This is the service that is used to mantain the stores inventory.
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  userValue: Boolean = false;

  constructor(private http: HttpClient) { }

  // This is the method that is used to get the stores information.
  getStoresInfo(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/inventory/getStoresInfo');
  }

  // This is the method that is used to get the products information.
  getProductsInfo(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/inventory/getProductsInfo');
  }

  // This is the method that is used to get the stores inventory.
  getAllStoresInventory(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/inventory/getAllStoresInventory');
  }

  // This is the method that is used to update the stores inventory.
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
