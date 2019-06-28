import { Property } from './property.model';

export class Appointment {
    date: string;
    maxInviteeCount: number;
    attendeeCount: number;
    property: Property = new Property();
}
