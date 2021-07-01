import { Component, Directive } from '@angular/core';
import { NgStyle } from '@angular/common';
import * as L from 'leaflet';
import {Business} from "../../Business";
import {Event} from "../../Event";
import {BusinessService} from "../../services/business.service";
import {EventService} from "../../services/event.service";
import {BusinessPhotos} from "../../BusinessPhotos";
import {BusinessType} from "../../BusinessType";
import {EventTypes} from "../../EventTypes";

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  title = 'Go Clubbing';
  map: any;

  modalFilterOpen:boolean=false;
  modalEventOpen:boolean=false;
  modalFilterResultOpen:boolean=false;
  businesses: Business[]=[];
  business: Business=new Business();
  eventss: Event[]=[];
  business_photos:string[]=[];
  event_photos:any={};

  //filters
  date:string="";
  location:string="";
  type:string="";
  theme:string="";
  age:number=0;
  business_name:string="";
  event_name:string="";
  business_type:string="";

  //filter options
  filters_business_types:BusinessType[]=[];
  filters_event_types:EventTypes[]=[];

  // filtered results
  filtered_businesses:Business[]=[];
  filtered_events:Event[]=[];

  constructor(private businessService:BusinessService, private eventsService:EventService){ }

  private initMap(): void {
    this.map = L.map('mymap', {
      center: [39.701104, -7.975786],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 7,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  public addMarker = (id:number, lat:number, long:number, descricao:string) => {
    var marker = L.marker([lat, long]).addTo(this.map).bindPopup(descricao).on("click", () => {
      this.getBusiness(id);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.getBusinesses();
  }

  getBusinesses():void{
    this.businessService.getBusinesses().subscribe(b => {
      this.businesses=b;
      b.map(bus => this.addMarker(bus.id, bus.lat, bus.lng, bus.name));
    });
  }

  getBusiness(id:number):void{
    this.businessService.getBusiness(id).subscribe(b => {
      this.business=b[0]; // apesar de ser um array só é retornado uma valor
      this.showBusinessModal(true);
      this.getEvents(b[0].id);
      this.getBusinessPhotos(b[0].id);
    });
  }

  getEvents(businessId:number):void{
    this.eventss=[]; // clear data

    this.eventsService.getEvents().subscribe(e => {
      e.map(ev => {
        if(ev.business==businessId){
          this.eventss.push(ev);
          this.getEventsPhotos(ev.id);
        }
      });
    });
  }

  getBusinessPhotos(businessId:number):void{
    this.business_photos=[]; // clear data

    this.businessService.getBusinessPhotos(businessId).subscribe(p => {
      p.map(photo => {
        this.business_photos.push(photo.path);
      });
    });
  }

  getEventsPhotos(eventId:number):void{
    this.event_photos[eventId]=[] // clear data

    this.eventsService.getEventPhotos(eventId).subscribe(p => {
      p.map(photo => {
        this.event_photos[eventId].push(photo.path);
      });
    });
  }

  showFilterModal():void{
    this.modalFilterOpen=!this.modalFilterOpen;
    this.modalFilterResultOpen=false;
    this.modalEventOpen=false;

    this.eventsService.getEventTypes().subscribe(e => {
      this.filters_event_types=e;
    });

    this.businessService.getBusinessesTypes().subscribe(b => {
      this.filters_business_types=b;
    });
  }

  showBusinessModal(v:boolean):void{
    this.modalEventOpen=v;
    this.modalFilterOpen=false;
    this.modalFilterResultOpen=false;
  }

  showFilteredResultsModal():void{
    this.modalEventOpen=false;
    this.modalFilterOpen=false;
    this.modalFilterResultOpen=true;
  }

  setDate(event:any):void{
    this.date=event.target.value;
  }

  setLocation(event:any):void{
    this.location=event.target.value;
  }

  setType(event:any):void{
    this.type=event.target.value;
  }

  setTheme(event:any):void{
    this.theme=event.target.value;
  }

  setAge(event:any):void{
    this.age=event.target.value;
  }

  setBusiness(event:any):void{
    this.business_name=event.target.value;
  }

  setName(event:any):void{
    this.event_name=event.target.value;
  }

  setBusinessType(event:any):void{
    this.business_type=event.target.value;
  }

  clearFilter():void{
    this.date="";
    this.location="";
    this.type="";
    this.theme="";
    this.age=0;
    this.business_name="";
    this.event_name="";
    this.business_type="";
  }

  filter():void{
    let queryStringBusiness="?"
    let queryStringEvent="?"

    if(this.date!="")
      queryStringEvent+="datetime="+this.date;

    if(this.location!=""){
      queryStringEvent+="location="+this.location;
      queryStringBusiness+="location="+this.location;
    }

    if(this.type!="")
      queryStringEvent+="type="+this.type;

    if(this.theme!="")
      queryStringEvent+="theme="+this.theme;

    if(this.age!=0)
      queryStringEvent+="min_age="+this.age;

    if(this.business_name!="")
      queryStringBusiness+="name="+this.business_name;

    if(this.event_name!="")
      queryStringEvent+="name="+this.event_name;

    if(this.business_type!="")
      queryStringBusiness+="type="+this.business_type;

    if(queryStringEvent!="?")
      this.eventsService.getFilteredEvents(queryStringEvent).subscribe(e => {
        this.filtered_events=e;
        console.log(queryStringEvent)
      });

    if(queryStringBusiness!="?")
      this.businessService.getFilteredBusinesses(queryStringBusiness).subscribe(b => {
        this.filtered_businesses=b;
        console.log(queryStringBusiness)
      });

    this.showFilteredResultsModal();
    this.clearFilter();
  }
}
