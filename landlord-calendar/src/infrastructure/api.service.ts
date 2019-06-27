import { Injectable } from '@angular/core';
import { NewObject } from './abstract-object-models/new-object.model';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Appointments } from '../app/models/appointments.model';
import { Appointment } from 'src/app/models/appointment.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url = './../app/data.json';
  constructor(private http: HttpClient) { }


    getThis(httpBackend: HttpBackend): Observable<Appointments> {

    return new Observable<Appointments> (

        observer => {

            const nonInterceptedJSONHTTPClient: HttpClient = new HttpClient(httpBackend);
            nonInterceptedJSONHTTPClient.get(this.url, { responseType: 'json' }).subscribe(result => {
                const appoints = result as Appointments;

                observer.next(appoints);

                observer.complete();

            }, error => {

                console.error(error);
                observer.error(error);

            });

        }

    );

}

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
