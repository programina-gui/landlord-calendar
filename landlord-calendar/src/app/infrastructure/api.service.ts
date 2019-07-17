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


  constructor(private http: HttpClient) {
  }


  getObject() {
    return this.http.get<Object>(this.url);
  }

}
