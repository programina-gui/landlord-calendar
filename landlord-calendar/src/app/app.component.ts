import { Component, AfterViewInit, ViewChild, Renderer2, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepicker, MatCalendar, MatDialog } from '@angular/material';
import { CalendarWeekViewComponent, CalendarData } from './templates/calendar-week-view/calendar-week-view.component';
import { AppointmentOverviewComponent } from './modals/appointment-overview/appointment-overview.component';
import { Property } from './models/property.model';
import { Appointment } from './models/appointment.model';
import { Agent } from './models/agent.model';


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
export class AppComponent implements AfterViewInit {

  data = new CalendarData();
  title = 'landlord-calendar';
  appointment: Appointment = new Appointment();
  property: Property = new Property();
  agent: Agent = new Agent();
  
  // date = new FormControl(moment());
  
  @ViewChild(MatDatepicker) picker: MatDatepicker<Moment>;
  isValidMoment: boolean = false;

  @ViewChild('calendar') calendar: MatCalendar<Moment>;
  selectedDate: Moment;

  // @Input()
  // calendarTemplate: TemplateRef<any>;


  constructor(private renderer: Renderer2, public dialog: MatDialog, private viewContainer: ViewContainerRef) {

  }
  

  monthSelected(date) {
    alert(`Selected: ${date}`);
  }

  onDateChanged(date) {
    alert(`Selected: ${date}`);
  }

  openDialog(): void {

    // mockdata: 
    this.agent.firstName = 'Hans';
    this.agent.name = 'Peter';
    this.agent.title = 'Agent';
    this.appointment.date = '01.02.2019';
    this.appointment.time = '18:00h';
    this.property.street = 'Musterstraße';
    this.property.houseNumber = '3';
    this.property.zipCode = '12335';

    const dialogRef = this.dialog.open(AppointmentOverviewComponent, {
      width: '250px',
      data: {appointment: this.appointment, property: this.property, agent: this.agent}
    });

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

  ngAfterViewInit(){
     // Find all arrow buttons in the calendar
    let buttons = document.querySelectorAll('mat-calendar mat-calendar-header button');

    if (buttons) {
      // Listen for click event
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, "click", () => {
          alert('Arrow button clicked');
        });
      })
    }
     
    // this.picker._selectedChanged.subscribe(
    //   (newDate: Moment) => {
    //     this.isValidMoment = moment.isMoment(newDate);
    //   },
    //   (error) => {
    //     throw Error(error);
    //   }
    // );
  }
}
