import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Event} from "../../Event";
import {EventService} from "../../services/event.service";
import {CookieService} from "ngx-cookie-service";
import {Event_Type} from "../../Event_Type";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  @Input() event!: Event;

  types!: Event_Type[];

  constructor(private router : Router, private route: ActivatedRoute, private cookieService : CookieService, private location: Location, private eventService : EventService) {}

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") != "" ) {
      this.getEvent();
      this.getTypes();
    } else{
      this.router.navigate(["/login"]);
    }
  }

  getEvent() : void{
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.eventService.getEvent(id).subscribe(event => this.event = event[0]);
  }

  getTypes() : void{
    this.eventService.getEventTypes().subscribe(types => this.types = types);
  }

  update() : void{
    this.eventService.updateEvent(this.event).subscribe(answer =>{
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });
  }

  delete() : void{
    this.eventService.deleteEvent(this.event).subscribe(answer =>{
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });
  }
}
