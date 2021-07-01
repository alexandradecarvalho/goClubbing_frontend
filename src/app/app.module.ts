import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FormsModule} from "@angular/forms";
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { NewAdComponent } from './components/new-ad/new-ad.component';
import {MainComponent} from "./components/main/main.component";
import {LoginComponent} from "./components/login/login.component";
import {CookieService} from "ngx-cookie-service";
import {SignupComponent} from "./components/signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardHomeComponent,
    EventListComponent,
    AdsListComponent,
    CommentsListComponent,
    ProfileComponent,
    EditEventComponent,
    EditAdComponent,
    NewEventComponent,
    NewAdComponent,
    MainComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
