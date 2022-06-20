import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';

// This component is used to create a maintain employee.
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
    // Whisky Club website stores
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

  // this function is used to to initialize forms for employee attributes
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

  // this function is used to get the employees of the selected store
  getEmployees(Store: String) {

    this.idStore = this.selectStore(Store);
    this.searchCountry = this.selectCountry(Store);
    this.updateCountry = this.selectCountry(Store);
    this.EditidStore = this.idStore

    //call api service
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

  // this function is used to get the information of a selected employee
  getEmployee(employee: String) {
    //get idEmployee from employee array
    let infoEmployee = this.allEmployeesSotore.find(x => x.Ep[0].name == employee);
    this.idEmployee = infoEmployee.idEmployee;

    //call api service
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

  //this function is used to update the information of a selected employee
  //only if the information is complete
  updateStoreEmployee() {
    if (this.editForm.invalid) return;

    //call api service
    this.employeesService.updateStoreEmployee(this.editForm, this.EditidStore, this.idEmployee, this.updateCountry).subscribe(
      (data) => {
        console.log("Succes: ", data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }


  //this function is used to insert new employee
  //only if the information is complete
  insertStoreEmployee() {
    if (this.createForm.invalid) return;

    //call api service
    this.employeesService.insertStoreEmployee(this.createForm, this.InsertidStore, this.insertCountry).subscribe(
      (data) => {
        console.log("Succes: ", data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  //this function is used to delete a selected  employee
  deleteStoreEmployee() {
    if (this.editForm.invalid) return;

    //call api service
    this.employeesService.deleteStoreEmployee(this.idStore, this.idEmployee, this.updateCountry).subscribe(
      (data) => {
        console.log("Succes: ", data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  //this function is used to set Form with the information of selected employee
  setEditForm() {

    this.editForm.get('name').setValue(this.infoEmployee[0].Ep[0].name);
    this.editForm.get('lastName').setValue(this.infoEmployee[0].Ep[0].lastName);
    this.editForm.get('birthDate').setValue(this.infoEmployee[0].Ep[0].birthDate);
    this.editForm.get('localSalary').setValue(this.infoEmployee[0].localSalary);
    this.editForm.get('globalSalary').setValue(this.infoEmployee[0].globalSalary);
  }

  //this function is used to store the selected store for employee update
  getEditStore(Store: String) {
    this.EditidStore = this.selectStore(Store);
    this.updateCountry = this.selectCountry(Store);
  }

  //this function is used to store the selected store for employee insert
  getInsertStore(Store: String) {
    this.InsertidStore = this.selectStore(Store);
    this.insertCountry = this.selectCountry(Store);
  }

  //this function is used to get id Store
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

  // this function is used to get country from store
  selectCountry(store: String) {
    switch (store) {
      case 'Cork':
        return 'Ireland';
      case 'Galway':
        return 'Ireland';
      case 'Dublin':
        return 'Ireland';
      case 'Inverness':
        return 'Scotland';
      case 'Glasgow':
        return 'Scotland';
      case 'Edinburgh':
        return 'Scotland';
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
