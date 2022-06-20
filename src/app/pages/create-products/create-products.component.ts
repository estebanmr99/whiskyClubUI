import { DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateProductService } from '../../services/create-product.service';

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

  createForm: FormGroup;
  allTypes: any[];
  loading = false;
  idType: string;
  imgByteArray: string;
  productProfile: any = {};

  constructor(private formBuilder: FormBuilder,
    private createService: CreateProductService
  ) {
    //upload types of whiskey
    this.getTypes();
    this.imgByteArray = '';
  }

  //to initialize form for product attributes
  ngOnInit() {

    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      aged: ['', Validators.required],
      presentation: ['', Validators.required],
      globalPrice: ['', Validators.required],
    });
  }

  //create new product, only if the from is valid
  createProduct() {
    if (this.createForm.invalid) {
      return;
    }
    //call api service
    this.createService.insertProduct(this.createForm, this.idType, this.imgByteArray).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );

  }

  //get types to clasificate the whisky product
  getTypes() {
    this.createService.getTypes().subscribe(
      (data) => {
        this.allTypes = data;
      },
      (error) => {
        console.log("Error: ", error);
      }
    );

  }

  //this function gets the uploaded image to convert it and send it to the api
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    var image;

    reader.addEventListener("loadend", function () {
      image = reader.result;
      image= image.split(',')[1];
    }.bind(this), false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  //store the selected type to create the product
  selectType(type: String) {
    let infoType = this.allTypes.find(x => x.name == type);
    this.idType = infoType.idType;
  }

}
