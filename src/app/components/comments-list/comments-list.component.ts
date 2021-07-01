import { Component, OnInit } from '@angular/core';
import {Comment} from "../../Comment";
import {Event} from "../../Event";
import {Business} from "../../Business";
import {EventService} from "../../services/event.service";
import {CommentService} from "../../services/comment.service";
import {BusinessService} from "../../services/business.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  comments!: Comment[];
  events!: Event[];
  profile!: Business;

  thisBusiness: number;

  constructor(private router : Router, private cookieService : CookieService, private eventService : EventService, private commentService : CommentService, private businessService : BusinessService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") != "" ) {
      this.getEvents();
      this.getComments();
      this.getMyBusiness(this.thisBusiness);
    } else{
      this.router.navigate(["/login"]);
    }
  }

  getComments(){
    this.commentService.getComments().subscribe(comments => this.comments = comments);
  }

  getEvents(): void{
    this.eventService.getEvents().subscribe(events => this.events = events)
  }

  getEvent(id : number) : any{
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].id == id){
        return this.events[i];
      }
    }
  }

  private getMyBusiness(thisBusiness: number) : any {
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
  }

  delete(comment : Comment){
    this.commentService.deleteComment(comment).subscribe(res => {
      console.log(res);
      this.router.navigate(["/dashboard"]);
    });
  }
}
