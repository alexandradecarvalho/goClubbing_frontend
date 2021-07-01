import {Event_Type} from "./Event_Type";
import {Business} from "./Business";

export class Event{
  id!: number;
  name!: string;
  location!: string;
  datetime!: string;
  type!: string;
  theme!: string;
  min_age!: number;
  organization!: string;
  dress_code!: string;
  business!: number;
}
