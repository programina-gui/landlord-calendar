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
  appointmentArray: Nodes[] = [];
  appointments = [new Nodes()];
  noData = false;
  noDataTitle = 'Oops! There appears to be no data';

  appointmentMockData: AppointmentMockData = new AppointmentMockData();

  @Output()
  goForwardAppointmentEmitter: EventEmitter<any> = new EventEmitter();

  constructor( public dialogRef: MatDialogRef<AppointmentOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if (this.data) {
        if (this.data.appointments) {
          this.appointments = this.data.appointments;
          this.appointments.forEach( (val) => this.appointmentArray.push(val)
          );
        } else {
          this.appointments = [this.appointmentMockData.appointment1];
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
