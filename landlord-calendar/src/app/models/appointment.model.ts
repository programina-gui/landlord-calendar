import { NewObject } from "./abstract-classes/new-object.model";
import { Property } from "./property.model";
import { NewObjectArray } from "./abstract-classes/new-object-array.model";

export class Appointment extends NewObject {
    date: string;
    time: string;
    maxInviteeCount: number;
    attendeeCount: number;
    property: Property = new Property();
}

// TO DO: Extend abstract array class
export class AppointmentArray {}