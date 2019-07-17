import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDateService {

  date: Date = new Date();
  moment: Moment;
  dateSubject = new BehaviorSubject<Date>(this.date);
  momentSubject = new BehaviorSubject<Moment>(this.moment);

  constructor() {

  }

  changeDate(date: Date) {
    this.dateSubject.next(date);
  }



  changeMoment(momt: Moment) {
    this.momentSubject.next(momt);
  }
}
