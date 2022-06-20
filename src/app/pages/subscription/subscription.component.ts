import { Component, OnInit } from "@angular/core";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
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
  selection = new SelectionModel<any>(true, []);

  constructor(private tokenService: JWTTokenService,
    private localStorage: LocalStorageService,
    private userService: UserService) { }

  //function that receives the chosen subscription and 
  //assigns it to the user store in the login-token 
  //according to the country chosen when enter to web
  selectSubscription(id: string) {

    var idUser = this.tokenService.getId();
    //country store in the localStorage
    var country = this.localStorage.get('country');
    //call api service
    this.userService.addSubscription(idUser, id, country).subscribe(
      (data) => {
        console.log("Update");
      },
      (error) => {
        console.log("ErroR: ", error);
      }
    );
  }

  ngOnInit(): void { }
}
