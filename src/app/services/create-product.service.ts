import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateProductService {

  constructor(private http: HttpClient) { }

  insertProduct(productFormInfo: FormGroup, typeParam: string,imageParam: string ): Observable<any> {
    const body = {
      nameParam: productFormInfo.value.name,
      typeParam:typeParam,
      agedParam: productFormInfo.value.aged,
      presentationParam: productFormInfo.value.presentation,
      imageParam:imageParam,
      globalPriceParam: productFormInfo.value.globalPrice
    };
    return this.http.put<any>('http://localhost:3000/createProducts/insertProduct', body);
  }

  getTypes(): Observable<any> {
    const body = {
      idType: '',
      name:'',
      action: 'R'
    };
    return this.http.post<any>('http://localhost:3000/createProducts/getTypes', body);
  }
}
