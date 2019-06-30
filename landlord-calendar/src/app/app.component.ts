import { AppointmentMockData } from './infrastructure/mock-data';
import { Component, AfterViewInit, OnInit, ViewChild, Renderer2, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepicker, MatCalendar, MatDialog } from '@angular/material';
import { AppointmentOverviewComponent, DialogData } from './modals/appointment-overview/appointment-overview.component';
import { Property } from './models/property.model';
import { FormControl } from '@angular/forms';
import { Appointments } from './models/appointments.model';
import { User } from './models/user.model';
import { ApiService } from './infrastructure/api.service';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';
import { Nodes } from './models/nodes.model';


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
    appointment: Nodes = new Nodes();
    appointmentArray: Appointments[];
    // appointmentObservable$: Observable<Appointments[]>;
    agent: User = new User();
    appointments: Appointments;
    agents: User[];
    properties: Property[];
    // TO DO: Inhalt von moment
    date = new FormControl(moment());
    username = '';
    username$: Observable<string>;
    propertyName = '';

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
      // this.appointment = this.mockData.appointment1;
      // console.log('Appointment Mock Data: ', this.appointment);
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

  createAppointmentsObj(appointmentsObj: any): Observable<Object> {
    this.appointments = new Appointments();
    this.appointments = appointmentsObj['data']['appointments'];
    this.appointments.nodes = appointmentsObj['data']['appointments']['nodes'];
    this.appointments.page = appointmentsObj['data']['appointments']['page'];
    console.log('New, filled Appointments ', this.appointments);
    for ( let i = 0; this.appointments.nodes.length > i; i++) {
      this.appointments.nodes[i].property = appointmentsObj['data']['appointments']['nodes'][i]['property'];
      console.log(this.appointments.nodes[i].property);
    }
    // console.log('New, filled Appointments ', this.appointments);
    // this.appointments.nodes.property.user =  appointmentsObj['data']['appointments']['nodes']['property']['user'];
    console.log('New, filled Appointments ', this.appointments);
    this.fillAppointment();
    return new Observable<{}>();
  }

  fillAppointment() {

      for ( let i = 0; this.appointments.nodes.length > i; i++) {
      const firstN = this.appointments.nodes[i].property.user.firstName;
      const name = this.appointments.nodes[i].property.user.name;
      this.username =  firstN + ' ' + name;
      this.propertyName = this.appointments.nodes[i].property.name;
      }
  }

  ngAfterViewInit() {

    const buttons = document.querySelectorAll('mat-calendar mat-calendar-header button');
    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
        });
      });
    }

  }

  ngOnInit() {
    this.test$ = this.apiService.getObject()
      .pipe(
        switchMap(appointmentsObj => this.createAppointmentsObj(appointmentsObj))
      );

     

      //   this.appointment = this.mockData.appointment1;
      //   console.log('Appointment Mock Data: ', this.appointment);
  }

}
