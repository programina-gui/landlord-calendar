import { AppointmentMockData } from './infrastructure/mock-data';
import { Component, AfterViewInit, OnInit, ViewChild, Renderer2, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepicker, MatCalendar} from '@angular/material';
import { Property } from './models/property.model';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Appointments } from './models/appointments.model';
import { Profile } from './models/user.model';
import { ApiService } from './infrastructure/api.service';
import { switchMap} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
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


    url = 'https://jsonplaceholder.typicode.com/posts';
    title = 'landlord-calendar';

    appointments: Appointments = new Appointments();
    appointmentArray: Appointments[] = [];

    /**TODO Find out how to use observable and transfer it to template, so changes in parent component can be seen in child */
    selectedNodes: Nodes[] = [new Nodes()];
    selectedNode: Nodes = new Nodes();
    agentObj: Profile = new Profile();
    agents: Profile[] = [];
    agent = '';

    properties: Property[] = [];
    propertyObj: Property = new Property();
    property = '';

    propertyForm: FormGroup;

    test$: Observable<Object>;

    @ViewChild(MatDatepicker) picker: MatDatepicker<Moment>;
    isValidMoment = false;

    @ViewChild('calendar') calendar: MatCalendar<Moment>;
    selectedDate: Moment;

    @Input()
    calendarTemplate: TemplateRef<any>;


    private appointmentChanged: Subject<void> = new Subject<void>();


  constructor(private renderer: Renderer2,
    private apiService: ApiService, private fb: FormBuilder) {
      this.propertyForm = this.fb.group ({
        'property': '',
        'agent': ''
      });

      this.agent = this.agentObj.userName;
      this.property = this.propertyObj.name;
    }

  monthSelected(date) {
    console.log(`Selected: ${date}`);
  }

  onDateChanged(date) {
    console.log(`Selected: ${date}`);
  }

  createAppointmentsObj(appointmentsObj: any): Observable<Object> {
    this.appointments = new Appointments();
    this.appointments = appointmentsObj['data']['appointments'];
    this.appointments.nodes = appointmentsObj['data']['appointments']['nodes'];
    this.appointments.page = appointmentsObj['data']['appointments']['page'];

    for ( let i = 0; this.appointments.nodes.length > i; i++) {
      this.appointments.nodes[i].property = appointmentsObj['data']['appointments']['nodes'][i]['property'];
      this.appointments.nodes[i].property.user = appointmentsObj['data']['appointments']['nodes'][i]['property']['user'];
      this.appointments.nodes[i].property.address = appointmentsObj['data']['appointments']['nodes'][i]['property']['address'];
     }

    this.fillAppointment();
    return new Observable<{}>();
  }


  fillAppointment() {
    console.log('nodes', this.appointments.nodes);
      for ( let i = 0; this.appointments.nodes.length > i; i++) {

          const firstN = this.appointments.nodes[i].property.user.profile.firstname;
          const name = this.appointments.nodes[i].property.user.profile.name;

          this.propertyObj = new Property();
          this.propertyObj.name = this.appointments.nodes[i].property.name;
          this.onPropertyChange();

          this.agentObj = new Profile();
          this.agentObj.userName = this.createUsername(firstN, name);

          this.properties.push(this.propertyObj);
          this.agents.push(this.agentObj);
      }

  }

  onPropertyChange() {

        this.propertyForm.get('property').valueChanges.subscribe(val => {

              this.propertyObj = val;
              if (this.propertyObj) {
                const nodes = this.appointments.nodes.filter( value => value.property.name === this.propertyObj.name);
                this.selectedNodes = nodes;
                this.appointmentChanged.next();
              }

      });

  }

  createUsername(string1: string, string2: string): string {
    const userName = string1 + ' ' + string2;
    return userName;
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
