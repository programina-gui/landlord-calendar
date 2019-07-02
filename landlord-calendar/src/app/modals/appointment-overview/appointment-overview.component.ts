import { AppointmentMockData } from './../../infrastructure/mock-data';
import { Component, OnInit, Inject, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointments } from 'src/app/models/appointments.model';
import { Nodes } from 'src/app/models/nodes.model';
import { Moment } from 'moment';


export interface DialogData {
    appointments: Nodes[];
    date: Date;
  }

  @Component({
    selector: 'app-appointment-overview',
    templateUrl: './appointment-overview.component.html',
    styleUrls: ['./appointment-overview.component.scss']
})
export class AppointmentOverviewComponent {

  appointments = [new Nodes()];
  noData = false;
  noDataTitle = 'Oops! There appears to be no data';
  date: Date = new Date();

  appointmentMockData: AppointmentMockData = new AppointmentMockData();

  // @Output()
  // goForwardAppointmentEmitter: EventEmitter<any> = new EventEmitter();

  constructor( public dialogRef: MatDialogRef<AppointmentOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if (this.data) {
        if (this.data.appointments && this.data.date) {
          this.appointments = this.data.appointments;
          this.date = this.data.date;
        } else {
          this.appointments = [this.appointmentMockData.appointment1];
          this.date = new Date(this.appointments[0].date);
        }
      } else {
        this.noData = true;
      }

      this.appointments = this.data.appointments;
    }

    apply() {
      this.dialogRef.close(true);
    }

    close(): void {
      this.dialogRef.close();
    }

}
