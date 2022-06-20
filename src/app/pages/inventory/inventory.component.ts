import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { InventoryService } from "src/app/services/inventory.service";
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { SelectionModel } from "@angular/cdk/collections";
import { first } from 'rxjs/operators';

// This component is used to show the inventory page.
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers: [DatePipe],
})
export class InventoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  productForm: FormGroup;
  loading: boolean;

  // the selection model for the table
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);

  // columns to display in the table
  displayedColumns: string[] = [
    "select",
    "name",
    "inventory",
  ];

  error: string;
  productInformation: any = {};

  stores = new FormControl();

  storesInfoList: Array<any> = [];
  productsInfoList: Array<any> = [];
  allStoresInventoryList: Array<any> = [];
  tableStoreInventoryList: Array<any> = [];

  constructor(
    public dialog: MatDialog,
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder,
  ) {
    this.loading = false;
    this.getStoresInfo();
    this.getProductsInfo();
    this.getAllStoresInventory();
  }

  // This function is used init the form validation.
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      idProduct: [''],
      inventory: ['', Validators.compose([Validators.required])],
      currency: ['', Validators.compose([
        Validators.required,
      ])],
      localPrice: ['', Validators.required],
      globalPrice: ['', Validators.required]
    });
  }

  // This function is used get the stores info.
  getStoresInfo() {
    this.inventoryService.getStoresInfo().subscribe(
      (data) => {
        this.storesInfoList = data;
      },
      (error) => {
        this.storesInfoList = [];
        console.log("Error: ", error);
      }
    );
  }

  // This function is used to get the product info.
  getProductsInfo() {
    this.inventoryService.getProductsInfo().subscribe(
      (data) => {
        this.productsInfoList = data;
      },
      (error) => {
        this.productsInfoList = [];
        console.log("Error: ", error);
      }
    );
  }

  // This function is used to get stores inventory.
  getAllStoresInventory() {
    this.inventoryService.getAllStoresInventory().subscribe(
      (data) => {
        this.allStoresInventoryList = data;
      },
      (error) => {
        this.allStoresInventoryList = [];
        console.log("Error: ", error);
      }
    );
  }

  // This function is used to select a new row and update the table.
  onStoreChange() {
    let idStore: number;
    if (this.stores.value != null) {
      // get the id of the store
      const foundIndex = this.storesInfoList.findIndex((x) => x.name === this.stores.value);
      idStore = this.storesInfoList[foundIndex].idStore;
      // refresh the table
      this.refreshTableStoreInventory(idStore);
    }
  }

  // This function is used to refresh the product table.
  refreshTableStoreInventory(idStore: number) {
    this.tableStoreInventoryList = [];
    // get the inventory of the selected store
    this.productsInfoList.forEach((product) => {
      const productInventory = this.allStoresInventoryList.find((productInventory) =>
        productInventory.idProduct === product.idProduct && productInventory.idStore === idStore);
      // if the product is in the store, add it to the table
      this.tableStoreInventoryList.push(
        {
          idProduct: product.idProduct,
          name: product.name,
          quantity: productInventory ? productInventory.quantity : 0,
          idStore: idStore
        });
    });
    this.refreshRows();
  }

  // This function is used init the paginator of the table.
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // This function is used to refresh the table.
  refreshTable() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // This function is used to refresh the rows of the table.
  refreshRows() {
    this.dataSource = new MatTableDataSource(this.tableStoreInventoryList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // This function is used when a user clicks on the checkbox inside the table.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // This function is used to check if all the checkboxes are selected.
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.id
      }`;
  }

  // This function is used to select only one checkbox and fill the inventory form.
  selectSingleRow(eventRow?: any) {
    // Uncheck all rows exept the selected one.
    this.dataSource.data.forEach((row) => {
      if (eventRow && eventRow === row) return;
      this.selection.deselect(row);
    });
    // get product information
    const productInventory = this.allStoresInventoryList.find((productInventory) =>
      productInventory.idProduct === eventRow.idProduct && productInventory.idStore === eventRow.idStore);

    // Fill the form with the selected row.
    this.productForm.setValue({
      idProduct: null,
      inventory: null,
      currency: null,
      localPrice: null,
      globalPrice: null,
    });
    if (productInventory && !this.selection.isSelected(eventRow)) {
      this.productForm.setValue({
        idProduct: productInventory.idProduct,
        inventory: productInventory.quantity,
        currency: productInventory.currency,
        localPrice: productInventory.localPrice,
        globalPrice: productInventory.globalPrice,
      });
    }
  }

  // This function is used to update the inventory of the selected product.
  updateInventory() {
    // stop here if form is invalid
    if (this.productForm.invalid) {
      window.alert("Please fill out the form correctly.");
      return;
    }

    this.loading = true;

    // get the selected row
    const foundIndex = this.storesInfoList.findIndex((x) => x.name === this.stores.value);
    const idStore = this.storesInfoList[foundIndex].idStore;
    const country = this.storesInfoList[foundIndex].country;

    // update the inventory of the selected product
    this.inventoryService.updateStoreInventory(idStore, country, this.productForm)
      .pipe(first())
      .subscribe(
        _ => {
          this.loading = false;
          this.error = "";
        },
        error => {
          console.log(error);
          this.error = "The has been an while updating the product, please try again later.";
          this.loading = false;
        },
        () => {
          this.getAllStoresInventory();
          window.alert("Products in store updated.");
        }
      );
  }

}
