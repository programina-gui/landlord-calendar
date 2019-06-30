import { Pagination } from './pagination.model';
import { Nodes } from './nodes.model';

export class Appointments {
    nodes: Nodes[] = [new Nodes];
    page: Pagination = new Pagination();
    hourRange: string;
}
