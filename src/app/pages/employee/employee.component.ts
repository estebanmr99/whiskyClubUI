import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  allStores: any[];
  allEmployeesSotore: any[];
  infoEmployee: any[];
  idStore: string;
  idEmployee: string;
  EditidStore: string;
  InsertidStore: string;
  updateCountry: string;
  searchCountry: string;
  insertCountry: string;
  loading = false;

  countryName = new FormControl();
  cityName = new FormControl();
  editForm: FormGroup;
  createForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private employeesService: EmployeesService) {

    this.allStores = [
      {
        counry: 'United States',
        stores: [
          { StoreName: 'Washington' },
          { StoreName: 'Los Angeles' },
          { StoreName: 'Dallas' },
        ]
      },
      {
        counry: 'Scotland',
        stores: [
          { StoreName: 'Inverness' },
          { StoreName: 'Glasgow' },
          { StoreName: 'Edinburgh' },
        ]
      },
      {
        counry: 'Ireland',
        stores: [
          { StoreName: 'Cork' },
          { StoreName: 'Galway' },
          { StoreName: 'Dublin' },
        ]
      },
    ];
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      localSalary: ['', Validators.required],
      globalSalary: ['', Validators.required],
    });
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      localSalary: ['', Validators.required],
      globalSalary: ['', Validators.required]
    });
  }

  getEmployees(Store: String) {
    this.idStore = this.selectStore(Store);
    this.searchCountry = this.selectCountry(Store);
    this.updateCountry = this.searchCountry;

    this.employeesService.getStoreEmployees(this.idStore, this.searchCountry).subscribe(
      (data) => {
        this.allEmployeesSotore = data;
      },
      (error) => {
        this.allEmployeesSotore = [];
        console.log("Error: ", error);
      }
    );

  }

  getEmployee(employee: String) {
    let infoEmployee = this.allEmployeesSotore.find(x => x.Ep[0].name == employee);
    this.idEmployee = infoEmployee.idEmployee;

    this.employeesService.getStoreEmployee(this.idStore, this.idEmployee, this.searchCountry).subscribe(
      (data) => {
        this.infoEmployee = data;
      },
      (error) => {
        this.infoEmployee = [];
        console.log("Error: ", error);
      },
      () => this.setEditForm()
    );

  }

  updateStoreEmployee() {
    if (this.editForm.invalid) return;

    this.employeesService.updateStoreEmployee(this.editForm, this.EditidStore, this.idEmployee, this.updateCountry).subscribe(
      (data) => {
        console.log("Succes: ", data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  insertStoreEmployee() {
    if (this.createForm.invalid) return;

    this.employeesService.insertStoreEmployee(this.createForm, this.InsertidStore, this.insertCountry).subscribe(
      (data) => {
        console.log("Succes: ", data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  deleteStoreEmployee() {
    if (this.editForm.invalid) return;

    this.employeesService.deleteStoreEmployee(this.idStore, this.idEmployee, this.updateCountry).subscribe(
      (data) => {
        console.log("Succes: ", data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  setEditForm() {
    this.editForm.get('name').setValue(this.infoEmployee[0].Ep[0].name);
    this.editForm.get('lastName').setValue(this.infoEmployee[0].Ep[0].lastName);
    this.editForm.get('birthDate').setValue(this.infoEmployee[0].Ep[0].birthDate);
    this.editForm.get('localSalary').setValue(this.infoEmployee[0].localSalary);
    this.editForm.get('globalSalary').setValue(this.infoEmployee[0].globalSalary);
  }

  getEditStore(Store: String) {
    this.EditidStore = this.selectStore(Store);
    this.updateCountry = this.selectCountry(Store);
  }

  getInsertStore(Store: String) {
    this.InsertidStore = this.selectStore(Store);
    this.insertCountry = this.selectCountry(Store);
  }

  selectStore(store: String) {
    switch (store) {
      case 'Cork':
        return '1';
      case 'Galway':
        return '2';
      case 'Dublin':
        return '3';
      case 'Inverness':
        return '4';
      case 'Glasgow':
        return '5';
      case 'Edinburgh':
        return '6';
      case 'Washington':
        return '7';
      case 'Los Angeles':
        return '8';
      case 'Dallas':
        return '9';
      default:
        return '0';
    }
  }

  selectCountry(store: String) {
    switch (store) {
      case 'Cork':
        return 'Ireland';
      case 'Galway':
        return 'Ireland';
      case 'Dublin':
        return 'Ireland';
      case 'Inverness':
        return 'Scotlan';
      case 'Glasgow':
        return 'Scotlan';
      case 'Edinburgh':
        return 'Scotlan';
      case 'Washington':
        return 'United States';
      case 'Los Angeles':
        return 'United States';
      case 'Dallas':
        return 'United States';
      default:
        return '';
    }
  }
}
