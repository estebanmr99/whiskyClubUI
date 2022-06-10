import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  imports: [MaterialModule],
})
@Component({
  selector: "app-maps",
  templateUrl: "./create-products.component.html",
  styleUrls: ["./create-products.component.scss"],
  providers: [DatePipe],
})
export class CreateProductsComponent implements OnInit {

  categoriesFilter = new FormControl();

  dataSource = new MatTableDataSource();

  allProductsResult: Array<any> = [];
  selection = new SelectionModel<any>(true, []);

  constructor(
  ) {}

  ngOnInit(): void {}

  }
