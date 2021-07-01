import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {Business} from "../../Business";
import {EventService} from "../../services/event.service";
import {BusinessService} from "../../services/business.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events!: Event[];
  profile!: Business;
  thisBusiness: number;


  constructor(private router: Router, private cookieService: CookieService, private eventService : EventService, private businessService : BusinessService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") != "" ) {
      this.getEvents();
      this.getMyBusiness(this.thisBusiness);
    } else{
      this.router.navigate(["/login"]);
    }
  }

  getEvents(): any{
    this.eventService.getEvents().subscribe(events => this.events = events);
  }

  getEvent(id : number) : any{
    this.eventService.getEvent(id);
  }

  delete(e : Event){
    this.eventService.deleteEvent(e).subscribe(res => {
      console.log(res);
      this.router.navigate(["/dashboard"]);
    });
  }

  private getMyBusiness(thisBusiness: number) : any {
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
  }
}
