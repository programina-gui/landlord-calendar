import { AppointmentMockData, AppointmentsMockData } from './../../infrastructure/mock-data';
import { Component, OnInit, Inject, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointments } from 'src/app/models/appointments.model';
import { Nodes } from 'src/app/models/nodes.model';
import { Moment } from 'moment';


export interface DialogData {
    nodes: Nodes[];
    date: Date;
    appointments: Appointments;
  }

  @Component({
    selector: 'app-appointment-overview',
    templateUrl: './appointment-overview.component.html',
    styleUrls: ['./appointment-overview.component.scss']
})
export class AppointmentOverviewComponent {

  nodes = [new Nodes()];
  noData = false;
  noDataTitle = 'Oops! There appears to be no data';
  date: Date = new Date();
  appointments: Appointments = new Appointments();

  appointmentMockData: AppointmentMockData = new AppointmentMockData();
  appointmentsMockData: AppointmentsMockData = new AppointmentsMockData();


  constructor( public dialogRef: MatDialogRef<AppointmentOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if (this.data) {
        if (this.data.nodes && this.data.date) {
          this.nodes = this.data.nodes;
          this.date = this.data.date;
          this.appointments = this.data.appointments;
          if (!this.appointments.hourRange) {
            this.appointments.hourRange = this.appointmentsMockData.hourRange;
          }
        } else {
          this.nodes = [this.appointmentMockData.appointment1];
          this.date = new Date(this.nodes[0].date);
        }
      } else {
        this.noData = true;
      }

      this.nodes = this.data.nodes;
    }

    apply() {
      this.dialogRef.close(true);
    }

    close(): void {
      this.dialogRef.close();
    }

}
