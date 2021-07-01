import { Injectable } from '@angular/core';
import { Event } from "../Event";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Event_Type} from "../Event_Type";
import {EventPhotos} from "../EventPhotos";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseURL = 'http://mike19.pythonanywhere.com/'
  constructor(private http : HttpClient, private cookieService : CookieService) { }

  getEvent(id : number) : Observable<Event[]>{
    const url = this.baseURL + 'api/events/search?id=' + id;
    return this.http.get<Event[]>(url);
  }

  getEvents() : Observable<Event[]>{
    const url = this.baseURL + 'api/events/all';
    return this.http.get<Event[]>(url)
  }

  createEvent(event : Event): Observable<any>{
    const url = this.baseURL + 'api/create/event';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.post(url, event, httpOptions);
  }

  updateEvent(event: Event): Observable<any>{
    const url = this.baseURL + 'api/update/event';
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.put(url, event, httpOptions);
  }

  deleteEvent(event: Event): Observable<any>{
    const url = this.baseURL + 'api/delete/event/' + event.id;
    let httpOptions = {
      headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':"Token " + this.cookieService.get("goclubbingLoginCookie")})
    }
    return this.http.delete<Event>(url, httpOptions);
  }

  getEventTypes() : Observable<Event_Type[]>{
    const url = this.baseURL + 'api/events/types';
    return this.http.get<Event_Type[]>(url)
  }

  getEventPhotos(id:number):Observable<EventPhotos[]>{
    const url=this.baseURL + "api/event_photos/" + id;
    return this.http.get<EventPhotos[]>(url);
  }

  getFilteredEvents(queryString:string):Observable<Event[]>{
    const url=this.baseURL + "api/events/search" + queryString;
    return this.http.get<Event[]>(url);
  }
}
