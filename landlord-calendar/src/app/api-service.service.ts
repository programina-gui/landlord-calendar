import { Injectable } from '@angular/core';
import { NewObject } from './models/abstract-classes/new-object.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Appointments } from './models/appointments.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
   
  url = './data.json';

  constructor(private http: HttpClient) { }

  // getElement(T: NewObject, identifier: string) {
  //   return this.http.get<NewObject[]>(this.url);
  // }

//   getAppointments(): Observable<Appointments> {
//     return this.http.get(this.url).pipe(
//        map((data: any[]) => data.map((item: any) => {
//            const model = new Appointments();
//            Object.assign(model, item);
//            if(item.appointments){
//                model.nodes = 'nodes';
//             }else{
//                model.page = 'pending';
//             }
//            return model;
//         }))
//         );
//  }
}
