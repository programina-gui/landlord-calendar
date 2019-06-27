import { NewObject } from "../../infrastructure/abstract-object-models/new-object.model";
import { Property } from "./property.model";
import { NewObjectArray } from "../../infrastructure/abstract-object-models/new-object-array.model";

export class Appointment extends NewObject {
    date: string;
    maxInviteeCount: number;
    attendeeCount: number;
    property: Property = new Property();
}

// TO DO: Extend abstract array class
export class AppointmentArray {}