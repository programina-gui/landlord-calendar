import { Appointment, AppointmentArray } from "./appointment.model";
import { Property } from "./property.model";
import { User } from "./user.model";
import { Pagination } from "./pagination.model";
import { Nodes } from "./nodes.model";

export class Appointments {

    nodes: Nodes = new Nodes;
    page: Pagination = new Pagination();
    hourRange: string;
    
}