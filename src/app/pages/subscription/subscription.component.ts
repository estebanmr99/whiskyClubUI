import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { MatTableDataSource } from "@angular/material/table";
import { DatePipe } from "@angular/common";
import { SelectionModel } from "@angular/cdk/collections";
import { JWTTokenService } from '../../services/jwttoken.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';

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

  constructor(private tokenService: JWTTokenService,
    private localStorage: LocalStorageService,
    private userService: UserService) {}

  selectSubscription(id:string){

    var iduser= this.tokenService.getId();
    var country = this.localStorage.get('country');

    this.userService.subscription(iduser,id,country).subscribe(
      (data) => {
        console.log("data: ", data);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );



  }
  ngOnInit(): void {}

  }