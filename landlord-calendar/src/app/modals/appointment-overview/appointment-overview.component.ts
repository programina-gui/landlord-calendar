import { Component, OnInit, Inject, Input, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment.model';
import { Property } from 'src/app/models/property.model';
import { Agent } from 'src/app/models/agent.model';


export interface DialogData {
  appointments: Appointment [];
    properties: Property[];
    agents: Agent[];
  }

  @Component({
    selector: 'app-appointment-overview',
    templateUrl: './appointment-overview.component.html',
  styleUrls: ['./appointment-overview.component.scss']
})
export class AppointmentOverviewComponent {
  appointments: Appointment[];

  constructor( public dialogRef: MatDialogRef<AppointmentOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.appointments = this.data.appointments;
    }

    apply() {
      this.dialogRef.close(true);
    }
    
    close(): void {
      this.dialogRef.close();
    }

}
