import { Injectable } from '@angular/core';
import { NewObject } from './abstract-classes/new-object.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  constructor(private http: HttpClient) { }

  // getElement(T: NewObject, identifier: string) {
  //   return this.http.get<NewObject[]>(this.url);
  // }
}
