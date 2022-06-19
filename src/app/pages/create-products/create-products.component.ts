import { DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateProductService } from '../../services/create-product.service';
import { DomSanitizer } from '@angular/platform-browser';


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
    private createService:CreateProductService,
    private sanitizer: DomSanitizer) {

    this.getTypes();
    this.imgByteArray = '';
  }

  ngOnInit() {

    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      aged: ['', Validators.required],
      presentation:['', Validators.required],
      globalPrice: ['', Validators.required],
    });
  }

  createProduct(){
    if (this.createForm.invalid) {
      return;
    }
    this.createService.insertProduct(this.createForm,this.idType,this.imgByteArray).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );

  }
  getTypes(){

    this.createService.getTypes().subscribe(
      (data) => {
        this.allTypes = data;
      },
      (error) => {
        console.log("Error: ", error);
      }
    );

  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();

    reader.addEventListener("loadend", function () {
      this.imgByteArray = reader.result;
      this.imgByteArray = this.imgByteArray.split(',')[1];
    }.bind(this), false);

    if (file) {
      reader.readAsDataURL(file);
    }

    console.log(this.imgByteArray);
  }

  selectType(type: String){
    let infoType = this.allTypes.find(x => x.name == type);
    this.idType = infoType.idType;
  }

  }
