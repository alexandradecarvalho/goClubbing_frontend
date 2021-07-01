import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Event} from "../Event";
import {Ad} from "../Ad";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private baseURL = 'http://mike19.pythonanywhere.com/'
  constructor(private http : HttpClient, private cookieService : CookieService) { }

  getAdvertisement(id : number) : Observable<Ad[]>{
    const url = this.baseURL + 'api/advertisements/search?id=' + id;
    return this.http.get<Ad[]>(url);
  }

  getAdvertisements() : Observable<Ad[]>{
    const url = this.baseURL + 'api/advertisements/all';
    return this.http.get<Ad[]>(url);
  }

  createAdvertisement(ad : Ad): Observable<any>{
    const url = this.baseURL + 'api/create/advertisement';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.post(url, ad, httpOptions);
  }

  updateAdvertisement(ad: Ad): Observable<any>{
    const url = this.baseURL + 'api/update/advertisement';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.put(url, ad, httpOptions);
  }

  deleteAdvertisement(ad: Ad): Observable<any>{
    const url = this.baseURL + 'api/delete/advertisement/' + ad.id;
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.delete<Event>(url, httpOptions);
  }
}
