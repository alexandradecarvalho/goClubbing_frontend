import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Event} from "../../Event"
import {Ad} from "../../Ad";
import {EventService} from "../../services/event.service";
import {AdvertisementService} from "../../services/advertisement.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.css']
})
export class EditAdComponent implements OnInit {
  @Input() ad!: Ad;

  events!: Event[];

  constructor(private router : Router, private route: ActivatedRoute, private cookieService : CookieService, private location: Location, private eventService : EventService, private adService : AdvertisementService) {
  }

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") != "" ) {
      this.getEvents()
      this.getAd();
    } else{
      this.router.navigate(["/login"]);
    }
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

  getAd() : void{
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.adService.getAdvertisement(id).subscribe(ad => this.ad = ad[0]);
  }

  getEvent(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  updateAd() : void{
    this.adService.updateAdvertisement(this.ad).subscribe(answer => {
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    })
  }

  delete() : void{
    this.adService.deleteAdvertisement(this.ad).subscribe(answer => {
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });;
  }

}
