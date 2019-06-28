import { Appointment } from '../models/appointment.model';
import { User } from '../models/user.model';
import { Property } from '../models/property.model';

const appointment1 = new Appointment();
    appointment1.attendeeCount  = 2;
    // TO DO Add function to trim off everything after "T"
    appointment1.date = '2019-03-09T11:00:00.000+0000';
    appointment1.maxInviteeCount = 3;
    appointment1.property.address.street = 'Karlhagenbeckstr';
    appointment1.property.address.houseNumber = 31;
    appointment1.property.name = '2 Zimmer in Stendal';


export class AppointmentMockData {
    appointment1: Appointment;
    constructor() {
        this.appointment1 = appointment1;
    }
}

const user1: User = new User();
const user2: User = new User();
    user1.name = 'Max';
    user1.firstName = 'Max'
    user2.firstName = 'Max';
    user2.name = 'Mustermann';
const users: User[] = [user1, user2];

export class UserMockData {

user1: User;
user2: User;
users: User[];
    constructor() {
        this.user1 = user1;
        this.user2 = user2;
        this.users = users;
    }
}

const property1 = new Property();
const property2 = new Property();
    property1.name = '2 Zimmer in Stendal';
    property2.name = 'Flat ohne name';
    this.properties = [property1, property2];


export class PropertyMockData {

    constructor() {
property1;
property2;
    }
}


const hourRange = '10-11';

export class AppointmentsMockData {

    constructor() {
         hourRange;
    }
}
