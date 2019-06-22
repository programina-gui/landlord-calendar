import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment.model';
import { Property } from 'src/app/models/property.model';
import { Agent } from 'src/app/models/agent.model';


export interface DialogData {
  appointment: Appointment;
    property: Property;
    agent: Agent;
  }

  @Component({
    selector: 'app-appointment-overview',
    templateUrl: './appointment-overview.component.html',
  styleUrls: ['./appointment-overview.component.scss']
})
export class AppointmentOverviewComponent {

  constructor( public dialogRef: MatDialogRef<AppointmentOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    apply() {
      this.dialogRef.close(true);
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

}
