import { Property } from './property.model';

export class Nodes {
    id: number;
    date: string;
    maxInviteeCount: number;
    attendeeCount: number;
    property: Property = new Property();
}
