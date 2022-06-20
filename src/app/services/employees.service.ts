import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';

// This is the service that is used to mantain an employee.
@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  // This is the method that is used to get the employees.
  getStoreEmployees(idStore: string, country: string): Observable<any> {
    const body = { idStore: idStore, country: country};
    return this.http.post<any>('http://localhost:3000/employee/getStoreEmployees', body);
  }

  // This is the method that is used to get a employee based on their ID.
  getStoreEmployee(idStore: string, idEmployee: string, country: string): Observable<any> {
    const body = { idStore: idStore, idEmployee: idEmployee,country: country};
    return this.http.post<any>('http://localhost:3000/employee/getStoreEmployee', body);
  }

  // This is the method that is used to update the employees.
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

  // This is the method that is used to create the employees.
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

  // This is the method that is used to delete the stores.
  deleteStoreEmployee(idStore: string, idEmployee: string, country: string): Observable<any> {
    const body = { store: idStore, idEmployee: idEmployee, country: country };
    return this.http.put<any>('http://localhost:3000/employee/deleteStoreEmployee', body);
  }
}
