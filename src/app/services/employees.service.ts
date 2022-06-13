import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getStoreEmployees(idStore: string): Observable<any> {
    const body = { };
    return this.http.get<any>('http://localhost:3000/employee/getStoreEmployees/' + idStore, body);
  }

  
  getStoreEmployee(idStore: string, idEmployee: string): Observable<any> {
    const body = { idStore: idStore, idEmployee: idEmployee };
    return this.http.post<any>('http://localhost:3000/employee/getStoreEmployee', body);
  }


  updateStoreEmployee(employeeFormInfo: FormGroup, store: string, idEmployee: string): Observable<any> {
    const body = {
      store: store,
      idEmployee: idEmployee,
      name: employeeFormInfo.value.name,
      lastName: employeeFormInfo.value.lastName,
      birthDate: employeeFormInfo.value.birthDate,
      localSalary: employeeFormInfo.value.localSalary,
      globalSalary: employeeFormInfo.value.globalSalary
    };
    return this.http.put<any>('http://localhost:3000/employee/updateStoreEmployee', body);
  }


  insertStoreEmployee(employeeFormInfo: FormGroup, store: string ): Observable<any> {
    const body = {
      store: store,
      name: employeeFormInfo.value.name,
      lastName: employeeFormInfo.value.lastName,
      birthDate: employeeFormInfo.value.birthDate,
      localSalary: employeeFormInfo.value.localSalary,
      globalSalary: employeeFormInfo.value.globalSalary
    };
    return this.http.put<any>('http://localhost:3000/employee/insertStoreEmployee', body);
  }


  deleteStoreEmployee(idStore: string, idEmployee: string): Observable<any> {
    const body = { idStore: idStore, idEmployee: idEmployee };
    return this.http.put<any>('http://localhost:3000/employee/deleteStoreEmployee', body);
  }

}
