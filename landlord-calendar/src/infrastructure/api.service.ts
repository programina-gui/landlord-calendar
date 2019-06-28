import { Injectable } from '@angular/core';
import { NewObject } from './abstract-object-models/new-object.model';
import { Observable } from 'rxjs/internal/Observable';
import { Appointments } from '../app/models/appointments.model';
import { Appointment } from 'src/app/models/appointment.model';
import { map } from 'rxjs/operators';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url = '../assets/data.json';
  // url = 'https://jsonplaceholder.typicode.com/posts';

  appointments: Appointments[];
 
// url = 'https://swapi.co/api/people/6/';
  constructor(private http: HttpClient) { 
    console.log(this.url);
    this.appointments = [new Appointments()];
  }


  getObject() {
    return this.http.get<Object>(this.url);
  }

//   Variante 3
    // getThis(): Observable<any> {

    //     return this.http.get(this.url, { responseType: 'json' }).pipe(
    //         map( (response: Response) => { 
    //             return response.json()})
    //     )

    // }

// Variante 1

// getElement() {
//   this.http.get<Response>(this.url).pipe(
//     map( (response: Response) => {
//       return response.json();
//     })
//   )
// }

// Variante 2
// getObject(): Observable<Appointment> {
    //   return this.http.get<Appointments[]>(this.url).pipe(
    //     map(appointment => this.mapToAppointment(appointment))
    //   );
    // }
   
  
    // private mapToAppointment(apt: string): NewObject {
    //   return {
    //     property: apt.property,
    //     maxInviteeCount: apt.maxInviteeCount,
    //     attendeeCount: apt.attendeeCount,
    //     date: apt.date,
    //   };
    // }

}
