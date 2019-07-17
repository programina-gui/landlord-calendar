import { AppointmentMockData, UserMockData } from './infrastructure/mock-data';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { ApiService } from './infrastructure/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NextViewingComponent } from './templates/next-viewing/next-viewing.component';
import { DateParserService } from './infrastructure/date-parser.service';
import { UpdateDateService } from './infrastructure/updateDate.service';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentOverviewComponent,
    CalendarWeekViewComponent,
    NextViewingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
  providers: [ ApiService, AppointmentMockData, UserMockData, DateParserService, UpdateDateService  ],
  exports: [ ],
  entryComponents: [ AppointmentOverviewComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
