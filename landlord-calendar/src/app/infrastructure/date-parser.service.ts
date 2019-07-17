import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateParserService {

  constructor() { }

  parseDateToString(date: Date): string {
    const newDate = date.toISOString();
    console.log('newDate - parsed string', newDate);
    return newDate;
  }

  parseStringToMoment(str: string): Moment {
    const date = moment(str);
    return date;
  } // format ISO 8601: '2013-02-14T13:15:03-08:00' (YYYY-MM-DDTHH:mm:ssZ)

  parseStringToDate(str: string) {

  }

  // this will return day, month, year seperately
  splitDateFormat(str: string): Date {
    const formated_Date = str;
    const date = new Date(formated_Date); // formated_Date - SDK returned date
    console.log(`${date.getDate()}, ${date.getMonth() + 1}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    return date;
  }

  findLatestDate(str: string[]) {
    let latestDate = new Date();
    const result =
      new Date(Math.min.apply(null, str.map(val => {
        latestDate = new Date(val);
      })));
    console.log('latest Date', latestDate);
    return latestDate;
  }

  findEarliestDate(str: string[]): Date {
    let earliestDate = new Date();
    const result =
      new Date(Math.min.apply(null, str.map(val => {
        earliestDate = new Date(val);
      })));
    console.log('earliest Date', earliestDate);
    return earliestDate;
  }


}
