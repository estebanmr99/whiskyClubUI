import { Component, OnInit, ViewChild } from "@angular/core";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { AttributesService } from "src/app/services/attributes.service";
import { ProductsService } from "src/app/services/products.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogBoxComponent } from "src/app/components/dialog-box/dialog-box.component";
import { DatePipe } from "@angular/common";
import { SelectionModel } from "@angular/cdk/collections";

@NgModule({
  imports: [MaterialModule],
})
@Component({
  selector: "app-maps",
  templateUrl: "./subscription.component.html",
  styleUrls: ["./subscription.component.scss"],
  providers: [DatePipe],
})
export class SubscriptionComponent implements OnInit {
 

  dataSource = new MatTableDataSource();

  allProductsResult: Array<any> = [];
  selection = new SelectionModel<any>(true, []);

  constructor(
  ) {}

  ngOnInit(): void {}

  }