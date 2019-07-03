import { Appointments } from './../models/appointments.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url = '../assets/data.json';
  // Alternative test data
  // url = 'https://jsonplaceholder.typicode.com/posts';
  // url = 'https://swapi.co/api/people/6/';

  appointments: Appointments[];

  constructor(private http: HttpClient) {
    this.appointments = [new Appointments()];
  }


  getObject() {
    return this.http.get<Object>(this.url);
  }

}
