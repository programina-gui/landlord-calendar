import { AppointmentMockData } from './infrastructure/mock-data';
import { Component, AfterViewInit, OnInit, ViewChild, Renderer2, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepicker, MatCalendar, MatDialog } from '@angular/material';
import { AppointmentOverviewComponent, DialogData } from './modals/appointment-overview/appointment-overview.component';
import { Property } from './models/property.model';
import { Appointment } from './models/appointment.model';
import { FormControl } from '@angular/forms';
import { Appointments } from './models/appointments.model';
import { User } from './models/user.model';
import { ApiService } from './infrastructure/api.service';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class AppComponent implements AfterViewInit, OnInit {

    posts: any;
    // url = './../assets/data.json';
    url = 'https://jsonplaceholder.typicode.com/posts';
    title = 'landlord-calendar';
    appointment: Appointment = new Appointment();
    appointmentArray: Appointments[];
    // appointmentObservable$: Observable<Appointments[]>;
    agent: User = new User();
    appointments: Appointments = new Appointments();
    agents: User[];
    properties: Property[];
    // TO DO: Inhalt von moment
    date = new FormControl(moment());

    @ViewChild(MatDatepicker) picker: MatDatepicker<Moment>;
    isValidMoment = false;

    @ViewChild('calendar') calendar: MatCalendar<Moment>;
    selectedDate: Moment;

    @Input()
    calendarTemplate: TemplateRef<any>;

    test$: Observable<Object>;

  constructor(private renderer: Renderer2,
    private http: HttpClient,
    public dialog: MatDialog,
    private viewContainer: ViewContainerRef,
    private apiService: ApiService,
    private mockData: AppointmentMockData) {
      this.appointment = this.mockData.appointment1;
      console.log('Appointment Mock Data: ', this.appointment);
    }

  // monthSelected(date) {
  //   console.log(`Selected: ${date}`);
  //   this.openDialog(date);
  // }

  // onDateChanged(date) {
  //   console.log(`Selected: ${date}`);
  //   this.openDialog(date);
  // }

  // openDialog(date?: string): void {
  //   const data: DialogData = {
  //       appointments: this.appointments,
  //       appointmentArray: [this.appointments]
  //   }

  //   const dialogRef = this.dialog.open(AppointmentOverviewComponent, { data });
  //   dialogRef.afterClosed().subscribe(result => {
  //       console.log('The dialog was closed');
  //       if (result) {
  //             alert('You have created a viewing.');
  //       } else (error) => { throw Error(error);}
  //     });
  // }
  // getAppointment(){
  //   this.posts = this.http.get(this.url, { responseType: 'json' });
  // }

  gehdochmal(x2: any): Observable<Object> {
    console.log(x2['data']['appointments']['page']);
    return new Observable<{}>();
  }

  ngAfterViewInit(){
    const buttons = document.querySelectorAll('mat-calendar mat-calendar-header button');
    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
        });
      });
    }
  }

  ngOnInit(){
    this.test$ = this.apiService.getObject()
      .pipe(
        switchMap(x2 => this.gehdochmal(x2))
      )
  }

}
