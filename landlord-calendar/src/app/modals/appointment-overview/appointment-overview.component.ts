import { Component, OnInit, Inject, Input, TemplateRef, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointments } from 'src/app/models/appointments.model';
import { Appointment } from 'src/app/models/appointment.model';


export interface DialogData {
    appointments: Appointments;
    appointmentArray: Appointment[]
    
  }

  @Component({
    selector: 'app-appointment-overview',
    templateUrl: './appointment-overview.component.html',
    styleUrls: ['./appointment-overview.component.scss']
})
export class AppointmentOverviewComponent {
  appointments: Appointments;
  appointmentArray: Appointment[];
  appointment1 = new Appointment();
  

  @Output()
  goForwardAppointmentEmitter: EventEmitter<any>;

  constructor( public dialogRef: MatDialogRef<AppointmentOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if (this.data.appointmentArray){
        this.appointmentArray = this.data.appointmentArray;
      } else {
        this.appointmentArray=[this.appointment1];
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
