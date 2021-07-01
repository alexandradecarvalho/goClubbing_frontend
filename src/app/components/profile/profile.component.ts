import { Component, OnInit } from '@angular/core';
import {Business} from "../../Business";
import {BusinessService} from "../../services/business.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: Business;
  profileImageBase64!: string;
  thisBusiness: number;

  constructor(private router : Router, private cookieService : CookieService, private businessService : BusinessService) {
    this.thisBusiness = parseInt(<string>localStorage.getItem("goclubbingBusinessID"));
  }

  ngOnInit(): void {
    if(this.cookieService.get("goclubbingLoginCookie") != "" ) {
      this.getMyBusiness(this.thisBusiness);
    } else{
      this.router.navigate(["/login"]);
    }

  }

  getMyBusiness(thisBusiness: number) : any{
    this.businessService.getBusiness(thisBusiness).subscribe(profile => this.profile = profile[0]);
  }

  getBase64(fileInput: any) : any{
    if (fileInput.target.files) {
      if (fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        if (fileInput.target.files[0].size > max_size) {
          return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const imgBase64Path = e.target.result;
            this.profileImageBase64 = imgBase64Path.split(",")[1];
          };
        };
      }
    }
  }

  save(profile : Business) : void{
    profile.profilePhoto = this.profileImageBase64;
    this.businessService.updateBusiness(profile).subscribe(answer => {
      console.log(answer);
      this.router.navigate(["/dashboard"]);
    });
  }
}
