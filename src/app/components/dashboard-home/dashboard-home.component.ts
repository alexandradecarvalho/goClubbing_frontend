import { Component, OnInit } from '@angular/core';
import {Event} from "../../Event";
import {Ad} from "../../Ad";
import {Comment} from "../../Comment";
import {Business} from "../../Business";
import {EventService} from "../../services/event.service";
import {AdvertisementService} from "../../services/advertisement.service";
import {CommentService} from "../../services/comment.service";
import {BusinessService} from "../../services/business.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  events!: Event[];
  ads!: Ad[];
  comments!: Comment[];
  profile!: Business;

  isVerified!: boolean;
  thisBusiness: number;

  constructor(private router : Router, private authService : AuthenticationService, private eventService: EventService, private adService : AdvertisementService, private commentService : CommentService, private businessService : BusinessService, private cookieService : CookieService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
    if(this.cookieService.get("goclubbingLoginCookie") != ""){
      this.getEvents();
      this.getAds()
      this.getComments();
      this.getMyBusiness(this.thisBusiness);
    } else{
      this.router.navigate(["/login"]);
    }
  }

  ngOnInit(): void {
    this.verifySession();
    if(this.cookieService.get("goclubbingLoginCookie") != ""){
      this.getEvents();
      this.getAds()
      this.getComments();
      this.getMyBusiness(this.thisBusiness);
    } else{
      this.router.navigate(["/login"]);
    }
  }

  verifySession() : any {
    this.authService.verify(this.thisBusiness).subscribe(json => {
      if('message' in json) {
        return true;
      } else{
        return false;
      }
    })
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => {
      events.map(event => {
        if(event.business == this.thisBusiness){
          if(this.events) {
            this.events.push(event);
          } else{
            this.events = [event];
          }
        }
      });

    });
  }

  getAds() : void{
    this.adService.getAdvertisements().subscribe(ads => {
      ads.map(ad => {
        if(this.events.map(event => event.id).indexOf(ad.event) != -1){
          if(this.ads) {
            this.ads.push(ad);
          } else{
            this.ads = [ad];
          }
        }
      });

    });
  }

  getComments() : void{
    this.commentService.getComments().subscribe(comments => {
      comments.map(comment => {
        if(this.events.map(event => event.id).indexOf(comment.event) != -1){
          if(this.comments) {
            this.comments.push(comment);
          } else{
            this.comments = [comment];
          }
        }
      });

    });
  }

  isMyEvent(id :number) : boolean{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return true;
      }
    }
    return false;
  }

  getMyBusiness(thisBusiness: number) : any{
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
  }

  getEventFromId(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  delete(comment : Comment){
    this.commentService.deleteComment(comment).subscribe(res => {
      console.log(res);
      this.router.navigate(["/dashboard"]);
    });
  }

}
