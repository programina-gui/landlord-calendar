import { Appointments } from 'src/app/models/appointments.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Nodes } from 'src/app/models/nodes.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-next-viewing',
  templateUrl: './next-viewing.component.html',
  styleUrls: ['./next-viewing.component.scss']
})
export class NextViewingComponent implements OnInit, OnDestroy {


  private appointmentChanged: any;

  @Input() selectedNodesUpdate: Observable<void>;
  @Input() nextViewing: Nodes;

  title = 'Next Viewing';
  errorMessage = 'There are no viewings.';
  viewing: Nodes;


  constructor() { }


  updateViewing() {
    this.viewing = this.nextViewing;
  }

  ngOnInit() {
    this.appointmentChanged = this.selectedNodesUpdate.subscribe(() => this.updateViewing());
  }

  ngOnDestroy() {
    this.appointmentChanged.unsubscribe();
  }

}
