import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import {
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentOverviewComponent } from './modals/appointment-overview/appointment-overview.component';
import { CalendarWeekViewComponent } from './templates/calendar-week-view/calendar-week-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentOverviewComponent,
    CalendarWeekViewComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    FormsModule, 
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BrowserAnimationsModule,  
    NoopAnimationsModule, 
    ReactiveFormsModule,
    MatInputModule, 
    MatNativeDateModule,
    MatDialogModule, 
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [ ],
  exports: [ CalendarWeekViewComponent ],
  entryComponents: [ AppointmentOverviewComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
