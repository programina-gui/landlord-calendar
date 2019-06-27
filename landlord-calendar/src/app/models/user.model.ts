import { NewObject } from "../../infrastructure/abstract-object-models/new-object.model";

export class User extends NewObject {
    firstName: string;
    name: string;
    title: string;
}