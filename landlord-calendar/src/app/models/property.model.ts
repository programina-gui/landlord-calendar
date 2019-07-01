import { User } from './user.model';
import { Address } from './address.model';

export class Property {
    id: number;
    name: string;
    inviteeCount: number;
    address: Address = new Address();
    user: User = new User();
}
