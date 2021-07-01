import { Component, OnInit } from '@angular/core';
import {Ad} from "../../Ad";
import {AdvertisementService} from "../../services/advertisement.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {EventService} from "../../services/event.service";
import {Event} from "../../Event";

@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {
  ad: Ad;
  ads!: Ad[];
  events!: Event[];

  thisBusiness : number;

  constructor(private router : Router, private cookieService : CookieService, private adService : AdvertisementService, private eventService : EventService) {
    this.ad = new Ad();

    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") != "" ) {
      this.getMyEvents();
    } else{
      this.router.navigate(["/login"]);
    }
  }

  getMyEvents() : void{
    this.eventService.getEvents().subscribe(events => {
      events.map(ev => {
        if(ev.business==this.thisBusiness){
          console.log("SIM");
          if(this.events)
            this.events.push(ev);
          else
            this.events = [ev];
          console.log(this.events);
        }
      });
    });
  }


  save(ad : Ad) : void{
    this.adService.createAdvertisement(ad).subscribe(answer =>{
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });
  }

}
