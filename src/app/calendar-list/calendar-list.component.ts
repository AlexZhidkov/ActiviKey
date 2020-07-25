import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Event } from '../model/event';

interface CalendarEvent {
  day: Date;
  events: Event[];
}

@Component({
  selector: 'app-calendar-list',
  templateUrl: './calendar-list.component.html',
  styleUrls: ['./calendar-list.component.css']
})
export class CalendarListComponent implements OnInit {
  isLoading: boolean;
  calendarEvents: Event[];

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.calendarEvents = [];
    const today = new Date();
    let dayOfWeek = today.getDay() - 1;
    if (dayOfWeek < 0) {
      dayOfWeek = 6;
    }
    this.service.getNearbyEvents().then(nearbyEvents => {
      nearbyEvents.forEach(event => {
        let addDays: number;
        if (!event.date && event.dayOfWeek) {
          addDays = 0;
          if (event.dayOfWeek >= dayOfWeek) {
            addDays = event.dayOfWeek - dayOfWeek;
          } else {
            addDays = dayOfWeek - event.dayOfWeek + 5;
          }
          if (!isNaN(addDays)) {
            event.date = new Date();
            if (event.startTime) {
              const h = parseInt(event.startTime.substring(0, 2), 10);
              if (!isNaN(h)) {
                event.date.setHours(h);
              }
              const m = parseInt(event.startTime.substring(3, 5), 10);
              if (!isNaN(m)) {
                event.date.setMinutes(m);
              }
              event.date.setSeconds(0, 0);
            }
            event.date.setDate(today.getDate() + addDays);
          }
        }
        if (event.date) {
          this.calendarEvents.push(event);
        }
      });
      this.calendarEvents.sort((a, b) => ((a.date as Date).getTime() - (b.date as Date).getTime()));
      this.isLoading = false;
    });
  }

}
