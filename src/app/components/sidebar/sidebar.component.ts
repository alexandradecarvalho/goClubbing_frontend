import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private cookieService : CookieService) { }

  ngOnInit(): void {
  }

  exit() {
    this.cookieService.delete("goclubbingLoginCookie");
    this.cookieService.deleteAll();
    console.log(this.cookieService.getAll());
    this.router.navigate(["/login"]);
  }
}
