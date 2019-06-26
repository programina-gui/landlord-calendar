import { User } from "./user.model";
import { Address } from "./address.model";

export class Property {

    name: string;
    inviteeCount: number;
    address: Address = new Address();
    user: User = new User();

} 