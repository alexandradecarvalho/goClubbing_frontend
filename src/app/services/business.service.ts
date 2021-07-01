import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Business} from "../Business";
import {Event} from "../Event";
import {CookieService} from "ngx-cookie-service";

import {BusinessPhotos} from "../BusinessPhotos";
import {BusinessType} from "../BusinessType";


@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private baseUrl = "http://mike19.pythonanywhere.com/";
  private photosBaseUrl = "http://mike19.pythonanywhere.com/api/business_photos/";
  private typesBaseUrl = "http://mike19.pythonanywhere.com/api/business/types";

  constructor(private http: HttpClient, private cookieService : CookieService) {

  }

  getBusiness(id:number):Observable<Business[]>{
    const url = this.baseUrl + "api/business/search?id="+id;
    return this.http.get<Business[]>(url);
  }

  getBusinesses():Observable<Business[]>{
    const url = this.baseUrl + 'api/business/all';
    return this.http.get<Business[]>(url);
  }

  createBusiness(business : Business): Observable<any>{
    const url = this.baseUrl + 'api/create/business';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.post(url, business, httpOptions);
  }

  updateBusiness(business: Business): Observable<any>{
    const url = this.baseUrl + 'api/update/business';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.put(url, business, httpOptions);
  }

  deleteEvent(event: Event): Observable<any>{
    const url = this.baseUrl + 'api/delete/business/' + event.id;
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.delete<Event>(url, httpOptions);
  }
  
  getBusinessPhotos(id:number):Observable<BusinessPhotos[]>{
    const url = this.photosBaseUrl+id;
    return this.http.get<BusinessPhotos[]>(url);
  }

  getFilteredBusinesses(queryString:string):Observable<Business[]>{
    const url = this.baseUrl + "api/business/search" + queryString;
    return this.http.get<Business[]>(url);
  }

  getBusinessesTypes():Observable<BusinessType[]>{
    const url = this.typesBaseUrl;
    return this.http.get<BusinessType[]>(url);
  }
}
