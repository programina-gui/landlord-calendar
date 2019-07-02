import { AppointmentOverviewComponent, DialogData } from './../../modals/appointment-overview/appointment-overview.component';
import { Component, Input, OnInit, OnDestroy,  } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours  } from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventColor, EventAction, CalendarEvent } from 'calendar-utils';
import { Appointments } from 'src/app/models/appointments.model';
import { FormControl } from '@angular/forms';
import { Nodes } from 'src/app/models/nodes.model';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';

export class CalendarData {

  modalData: any;
  viewDate: any;
  view: any;
  action: any;

}


const colors: any = {
  black: {
    primary: '#2B2E33',
    secondary: '#2B2E33'
  },
  grey: {
    primary: '#F2F2F2',
    secondary: '#F2F2F2'
  }
};



@Component({
  selector: 'app-calendar-week-view',
  templateUrl: './calendar-week-view.component.html',
  styleUrls: ['./calendar-week-view.component.scss']
})
export class CalendarWeekViewComponent implements OnDestroy, OnInit {


  @ViewChild('modalContent', { read: true }) modalContent: TemplateRef<any>;



  view: CalendarView = CalendarView.Week;
  appointment: Nodes = new Nodes();
  appointments: Nodes[] = [];
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  calEntryTitle = 'New Appointment';
  calEntryColor = colors.black;
  id = 0;
  date = new Date();
  // thumbnailImage = 'https://www.immomio.de/wp-content/uploads/2015/06/11045809_10152644184541951_669594957_o.jpg';

  private appointmentChanged: any;

  @Input() selectedNodesUpdate: Observable<void>;
  @Input() nodes: Nodes[];


  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 1 day event',
    //   color: colors.black,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.grey,
    //   allDay: true
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: new Date(),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }

  ];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal,
    public dialog: MatDialog) {
    this.createCalendarEvent();
  }

  // updateCalendarEvents() {
  //   this.events = [];
  //   this.incomingEvents.forEach(element => {
  //     this.events.push(element);
  //   });
  // }

  // setCalEntryColor() {

  //   // wenn vergangenes Event

  //   // wenn zukünftiges Event

  // }

  updateNodes() {
    this.appointments = this.nodes;
    this.createCalendarEvent();
  }

  createCalendarEvent() {

    if (this.appointments) {
      this.events = [];
         this.appointments.forEach(element => {
        this.id = element.id;
        this.calEntryTitle = element.property.name;
        this.date = new Date(element.date);
        // this.calEntryColor = {
        //   // if ()
        // }
        let calEntry: CalendarEvent;
        calEntry = {
          id: this.id,
          start: addHours(startOfDay(this.date), 1),
          end: this.date,
          title: this.calEntryTitle,
          color: this.calEntryColor,
          actions: this.actions,
          resizable: {
            beforeStart: false,
            afterEnd: false
        },
        draggable: true,
      };
      // image: this.thumbnailImage
        this.events.push(calEntry);
      });
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }


  openDialog(): void {
    const data: DialogData = {
        appointments: [this.appointment],
        date: this.viewDate
    };

    const dialogRef = this.dialog.open(AppointmentOverviewComponent, { data });
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
              alert('You have created a viewing.');
        }
      });
  }


  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'sm' });
    this.openDialog();
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true
  //       }
  //     }
  //   ];
  // }

  // eventTimesChanged({
  //   event,
  //   newStart,
  //   newEnd
  // }: CalendarEventTimesChangedEvent): void {
  //   this.events = this.events.map(iEvent => {
  //     if (iEvent === event) {
  //       return {
  //         ...event,
  //         start: newStart,
  //         end: newEnd
  //       };
  //     }
  //     return iEvent;
  //   });
  //   this.handleEvent('Dropped or resized', event);
  // }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }


  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit() {
    this.appointmentChanged = this.selectedNodesUpdate.subscribe(() => this.updateNodes());
  }

  ngOnDestroy() {
    this.appointmentChanged.unsubscribe();
  }
}





