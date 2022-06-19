import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getStoreEmployees(idStore: string, country: string): Observable<any> {
    const body = { idStore: idStore, country: country};
    return this.http.post<any>('http://localhost:3000/employee/getStoreEmployees', body);
  }


  getStoreEmployee(idStore: string, idEmployee: string, country: string): Observable<any> {
    const body = { idStore: idStore, idEmployee: idEmployee,country: country};
    return this.http.post<any>('http://localhost:3000/employee/getStoreEmployee', body);
  }

  updateStoreEmployee(employeeFormInfo: FormGroup, store: string, idEmployee: string, country: string): Observable<any> {
    const body = {
      store: store,
      idEmployee: idEmployee,
      name: employeeFormInfo.value.name,
      lastName: employeeFormInfo.value.lastName,
      birthDate: employeeFormInfo.value.birthDate,
      localSalary: employeeFormInfo.value.localSalary,
      globalSalary: employeeFormInfo.value.globalSalary,
      country:country
    };
    return this.http.put<any>('http://localhost:3000/employee/updateStoreEmployee', body);
  }

  insertStoreEmployee(employeeFormInfo: FormGroup, store: string, country: string): Observable<any> {
    const body = {
      store: store,
      name: employeeFormInfo.value.name,
      lastName: employeeFormInfo.value.lastName,
      birthDate: employeeFormInfo.value.birthDate,
      localSalary: employeeFormInfo.value.localSalary,
      globalSalary: employeeFormInfo.value.globalSalary,
      country:country
    };
    return this.http.put<any>('http://localhost:3000/employee/insertStoreEmployee', body);
  }

  deleteStoreEmployee(idStore: string, idEmployee: string, country: string): Observable<any> {
    const body = { store: idStore, idEmployee: idEmployee, country: country };
    return this.http.put<any>('http://localhost:3000/employee/deleteStoreEmployee', body);
  }
}
