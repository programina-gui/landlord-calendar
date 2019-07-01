import { AppointmentMockData } from './infrastructure/mock-data';
import { Component, AfterViewInit, OnInit, ViewChild, Renderer2, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepicker, MatCalendar} from '@angular/material';
import { Property } from './models/property.model';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Appointments } from './models/appointments.model';
import { User } from './models/user.model';
import { ApiService } from './infrastructure/api.service';
import { map, switchMap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable } from 'rxjs';
import { Nodes } from './models/nodes.model';
import { Address } from './models/address.model';


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


    url = 'https://jsonplaceholder.typicode.com/posts';
    title = 'landlord-calendar';

    appointments: Appointments;
    appointmentArray: Appointments[];
    selectedNode: Nodes = new Nodes();

    agent: User = new User();
    agents: User[] = [];

    properties: Property[] = [];
    property: Property = new Property();

    // TO DO: Inhalt von moment
    date = new FormControl(moment());

    propertyForm: FormGroup;

    test$: Observable<Object>;
    selectFormControl = new FormControl('', Validators.required);

    @ViewChild(MatDatepicker) picker: MatDatepicker<Moment>;
    isValidMoment = false;

    @ViewChild('calendar') calendar: MatCalendar<Moment>;
    selectedDate: Moment;

    @Input()
    calendarTemplate: TemplateRef<any>;




  constructor(private renderer: Renderer2,
    private apiService: ApiService, private fb: FormBuilder) {
  
    this.propertyForm = this.fb.group ({
      'property': '',
      'agent': ''
    });

    this.onPropertyChange();

    }

  monthSelected(date) {
    console.log(`Selected: ${date}`);
  }

  onDateChanged(date) {
    console.log(`Selected: ${date}`);
  }

  // extractMonth(date: string) {

  // }

  createAppointmentsObj(appointmentsObj: any): Observable<Object> {
    this.appointments = new Appointments();
    this.appointments = appointmentsObj['data']['appointments'];
    this.appointments.nodes = appointmentsObj['data']['appointments']['nodes'];
    this.appointments.page = appointmentsObj['data']['appointments']['page'];
    console.log('New, filled Appointments ', this.appointments);
    let property = new Property();
    let user = new User();
    let address = new Address();

    for ( let i = 0; this.appointments.nodes.length > i; i++) {
      property = appointmentsObj['data']['appointments']['nodes'][i]['property'];
        user = appointmentsObj['data']['appointments']['nodes'][i]['property']['user'];
        address = appointmentsObj['data']['appointments']['nodes'][i]['property']['address'];
     }

    console.log('New, filled Appointments ', this.appointments);
    this.fillAppointment();
    return new Observable<{}>();
  }


  fillAppointment() {

      for ( let i = 0; this.appointments.nodes.length > i; i++) {

          const firstN = this.appointments.nodes[i].property.user.firstName;
          const name = this.appointments.nodes[i].property.user.name;
          const userName = firstN + ' ' + name;
          const propertyName = this.appointments.nodes[i].property.name;

          this.property = new Property();
          this.property.name = propertyName;
          this.agent = new User();
          this.agent.userName = userName;

          this.properties.push(this.property);
          this.agents.push(this.agent);
      }

  }

  onPropertyChange() {
    this.propertyForm.valueChanges.subscribe(val => {
      this.property = val;
    });
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

  }

}
