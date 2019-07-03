import { DateParserService } from './../../infrastructure/date-parser.service';
import { AppointmentOverviewComponent, DialogData } from './../../modals/appointment-overview/appointment-overview.component';
import { Component, Input, OnInit, OnDestroy,  } from '@angular/core';
import { ViewChild, TemplateRef } from '@angular/core';
import { startOfDay, isSameDay, isSameMonth, addHours  } from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { CalendarEventAction, CalendarView} from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent } from 'calendar-utils';
import { Appointments } from 'src/app/models/appointments.model';
import { Nodes } from 'src/app/models/nodes.model';

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
  nodes: Nodes[] = [];
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  viewingDates: string[] = [];
  calEntryTitle = 'New Appointment';
  calEntryColor = colors.black;
  id = 0;
  date: string;
  // thumbnailImage = 'https://www.immomio.de/wp-content/uploads/2015/06/11045809_10152644184541951_669594957_o.jpg';

  private appointmentChanged: any;

  @Input() selectedNodesUpdate: Observable<void>;
  @Input() nodesIncoming: Nodes[];
  @Input() appointments: Appointments;



  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil">Open  </i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.openDialog(event);
      }
    }
  ];


  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  nextViewing: Nodes;

  activeDayIsOpen = true;

  constructor(private modal: NgbModal,
    public dialog: MatDialog, private dateParser: DateParserService) {
    this.createCalendarEvent();
  }


  // setCalEntryColor() {

  //   // wenn vergangenes Event

  //   // wenn zukünftiges Event

  // }

  updateNodes() {
    this.nodes = this.nodesIncoming;
    this.createCalendarEvent();
  }

  createCalendarEvent() {

    if (this.nodes) {
      this.events = [];
         this.nodes.forEach(element => {
           if (element.date) {
                this.viewingDates.push(element.date);
                this.id = element.id;
                this.calEntryTitle = element.property.name;
                this.date = element.date;
                const result = this.dateParser.parseStringToMoment(element.date);
                console.log('parsingResult to Moment ', result);

                // this.calEntryColor = {
                //   // if ()
                // }
                let calEntry: CalendarEvent;
                calEntry = {
                  id: this.id,
                  // start: addHours(startOfDay(new Date(this.date)), 1),
                  start: addHours(startOfDay(this.date), 1),
                  end: new Date(this.date),
                  title: this.calEntryTitle,
                  color: this.calEntryColor,
                  actions: this.actions,
                  resizable: {
                    beforeStart: false,
                    afterEnd: true
                },
                draggable: true,
              };
              this.events.push(calEntry);

              console.log(calEntry);
              // TO DO: pick earliest date and make calendar jump there
              // this.viewDate = this.dateParser.findEarliestDate();
               this.viewDate = this.dateParser.findEarliestDate(this.viewingDates);
               this.nextViewing = this.nodes.find( value => new Date(value.date) === this.viewDate);
         }
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


  openDialog(event: CalendarEvent): void {
    let appointmentsFilteredByDay: Nodes[];
    appointmentsFilteredByDay = this.nodes.filter(val => new Date(val.date).getDay() === event.start.getDay());
    console.log('Appointments Filtered By Day', appointmentsFilteredByDay);
    const data: DialogData = {
        nodes: appointmentsFilteredByDay,
        date: this.viewDate,
        appointments: this.appointments
    };

    const dialogRef = this.dialog.open(AppointmentOverviewComponent, { data });
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed.');
        if (result) {
              alert('This does not really create a viewing.');
        }
      });
  }


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





