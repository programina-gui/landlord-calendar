import { EventColor, EventAction } from 'calendar-utils';

export class CalendarEvent<MetaType = any> {
    id?: string | number;
    start: Date;
    end?: Date;
    title: string;
    color?: EventColor;
    actions?: EventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: MetaType;
}

export class CalEvent<MetaType = any> extends CalendarEvent {
    id: string | number;
    image?: string;
  }