import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginToken} from "../LoginToken";
import {RegisterToken} from "../RegisterToken";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrlLogin = "http://mike19.pythonanywhere.com/api/login/";
  private baseUrlSignup = "http://mike19.pythonanywhere.com/api/create/business";
  constructor(private http: HttpClient, private cookieService : CookieService) { }

  login(username:string, password:string):Observable<LoginToken>{
    const url = this.baseUrlLogin;
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.post<LoginToken>(url, {username:username, password:password})
  }

  signup(name:string, location:string, type:string, company_name:string, contact_email:string, contact_phone:number, username:string, password:string):Observable<RegisterToken>{
    const url = this.baseUrlSignup;
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    }
    //console.log({name:name, location:location, type:type, company_name:company_name, contact_email:contact_email, contact_phone:contact_phone, username:username, password:password});
    return this.http.post<RegisterToken>(url, {name:name, location:location, type:type, company_name:company_name, contact_email:contact_email, contact_phone:contact_phone, username:username, password:password})
  }

  verify(id : number) : Observable<JSON>{
    const url = "http://mike19.pythonanywhere.com/api/verify/" + id;
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.get<JSON>(url, httpOptions);
  }
}
