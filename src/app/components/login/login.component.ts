import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";
import { of } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/css/auth.css', '../../../assets/css/index.css']
})
export class LoginComponent {
  title = 'Go Clubbing';
  message:any = null;
  username:string="";
  password:string="";
  error:any=null;

  constructor(private router: Router, private authenticationService:AuthenticationService, private cookieService:CookieService) { }

  setUsername(event:any):void{
    this.username=event.target.value;
  }

  setPassword(event:any):void{
    this.password=event.target.value;
  }

  login():void{
    //console.log(this.username + " / " + this.password);
    if(this.username!="" && this.password!="")
      this.authenticationService.login(this.username, this.password).pipe(catchError(error => {
        return of(error.error);
      })).subscribe( res => {
        if("token" in res){
          this.cookieService.set("goclubbingLoginCookie", res.token)
          localStorage.setItem("goclubbingBusinessID", res.business)
          this.message={"type":"success", "body":"Login successful"};
          setTimeout(() => {
            this.router.navigate(["/dashboard"]);
          }, 750)
        }else{
          this.message={"type":"error", "body":res.error};
        }

      })
  }
}
