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
import { ApiService } from '../infrastructure/api.service';

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
  isValidMoment: boolean = false;

  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  selectedDate: Moment;

  @Input()
  calendarTemplate: TemplateRef<any>;

  test$: Observable<Object>;

  constructor(private renderer: Renderer2, private http: HttpClient, public dialog: MatDialog, private viewContainer: ViewContainerRef, private apiService: ApiService ) {

    const agent1 = new User();
    const agent2 = new User();
    agent1.name = 'Max';
    agent1.firstName = 'Max'
    agent2.firstName = 'Max';
    agent2.name = 'Mustermann';
    this.agents = [agent1, agent2];

    const property1 = new Property();
    const property2 = new Property();
    property1.name = '2 Zimmer in Stendal';
    property2.name = 'Flat ohne name';
    this.properties = [property1, property2];
  }
  

  monthSelected(date) {
    console.log(`Selected: ${date}`);
    this.openDialog(date);
  }

  onDateChanged(date) {
    console.log(`Selected: ${date}`);
    this.openDialog(date);
  }

  openDialog(date?: string): void {

    // mockdata: 
    const appointment1 = new Appointment();
    appointment1.attendeeCount = this.appointments.nodes.appointment.attendeeCount = 2;
    // TO DO Add function to trim off everything after "T"
    appointment1.date = this.appointments.nodes.appointment.date = '2019-03-09T11:00:00.000+0000';
    appointment1.maxInviteeCount = this.appointments.nodes.appointment.maxInviteeCount = 3;
    appointment1.property.address.street = 'Karlhagenbeckstr';
    appointment1.property.address.houseNumber = 31;
    appointment1.property.name = '2 Zimmer in Stendal';
    const hourRange = '10-11';
    this.appointments.hourRange = hourRange;
    const appointments = [appointment1];

    const data: DialogData = {
        appointments: this.appointments,
        appointmentArray: appointments
      }

    const dialogRef = this.dialog.open(AppointmentOverviewComponent, { data });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        alert('You have created a viewing.');
      } else {
          (error) => {
          throw Error(error);
        }
      }
      
    });
  }

  getAppointment(){
    this.posts = this.http.get(this.url, { responseType: 'json' });
  }

  ngAfterViewInit(){
    let buttons = document.querySelectorAll('mat-calendar mat-calendar-header button');
    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, "click", () => {
        });
      })
    }
  }
  gehdochmal(x2: any): Observable<Object> {
    console.log(x2['data']['appointments']['page']);
    return new Observable<{}>();
  }
  ngOnInit() {
  //   this.appointmentArray  = [new Appointments()];
    // this.apiService.getObject().pipe(
    //   map(apt =>  this.gehdochmal()))
      // switchMap( apt => apt. = this.appointments.nodes.appointment)
    
  // const data = require('../assets/data.json')
    this.test$ = this.apiService.getObject()
      .pipe(
        switchMap(x2 => this.gehdochmal(x2)),
    )

    // console.log(this.appointmentArray);



    // this.apiService.getThis().pipe(
    //     map(apt => apt = this.appointments)
    //     // map(nodes => nodes.appointment = this.appointments.nodes.appointment)
    //   );

    // this.http.get(this.url, { responseType: 'json' }).pipe(

    //   map(apt => apt = this.appointments)
    //   // map(nodes => nodes.appointment = this.appointments.nodes.appointment)
    // );
   
    // Variante 3
    // this.apiService.getThis().pipe(
    //   map(apt => apt.nodes = this.appointments.nodes)
    //   // map(nodes => nodes.appointment = this.appointments.nodes.appointment)
    // );

    // Variante 2
    // this.appointmentObservable$ = 
    // const apiElement = this.apiService.getElement();

    //  map(appointment => this.appointments[0] = appointment )

        // tap( console.log()),

        // this.appointmentArray[0] = this.appointments;
    // )
  
    // console.log(apiElement);
  }
     
    // TO DO: Connect small calendar to big calendar
    // FIX ME
    // this.picker._selectedChanged.subscribe(
    //   (newDate: Moment) => {
    //     this.isValidMoment = moment.isMoment(newDate);
    //   },
    //   (error) => {
    //     throw Error(error);
    //   }
    // );
  // }
}
