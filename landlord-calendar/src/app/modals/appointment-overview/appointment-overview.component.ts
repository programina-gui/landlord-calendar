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
  appointmentArray: Nodes[];
  appointments = [new Nodes()];
  noData = false;
  noDataTitle = 'Oops! There appears to be no data';

  @Output()
  goForwardAppointmentEmitter: EventEmitter<any>;

  constructor( public dialogRef: MatDialogRef<AppointmentOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if (this.data.appointments) {
        this.appointments = this.data.appointments;
        this.appointments.forEach( (val) => this.appointmentArray.push(val)
        );
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
