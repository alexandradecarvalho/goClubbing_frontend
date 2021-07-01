import { Component } from '@angular/core';
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {CookieService} from "ngx-cookie-service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../assets/css/auth.css', '../../../assets/css/index.css']
})
export class SignupComponent {
  message: any = null;

  name:string="";
  location:string="";
  type:string="";
  company_name:string="";
  contact_email:string="";
  contact_phone:number=0;
  username:string="";
  password:string="";

  constructor(private authenticationService:AuthenticationService, private cookieService:CookieService, private router: Router) { }

  setName(event:any):void{
    this.name=event.target.value;
  }

  setLocation(event:any):void{
    this.location=event.target.value;
  }

  setType(event:any):void{
    this.type=event.target.value;
  }

  setCompanyName(event:any):void{
    this.company_name=event.target.value;
  }

  setContactEmail(event:any):void{
    this.contact_email=event.target.value;
  }

  setContactPhone(event:any):void{
    this.contact_phone=event.target.value;
  }

  setUsername(event:any):void{
    this.username=event.target.value;
  }

  setPassword(event:any):void {
    this.password = event.target.value;
  }

  signup():void{
    if(this.username!="" && this.password!="")
      this.authenticationService.signup(this.name, this.location, this.type, this.company_name, this.contact_email, this.contact_phone, this.username, this.password)
        .pipe(catchError(error => {
        return of({"error":"User already registered"});
      })).subscribe( res => {
        if("error" in res){
          this.message={"type":"error", "body":res.error};
        }else{
          this.message={"type":"success", "body":"Signup successful"};
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 750)
        }
      })
  }
}
