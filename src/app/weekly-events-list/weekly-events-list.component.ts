import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { EventData } from '../model/event';

interface WeeklyEvent {
  day: string;
  events: EventData[];
}

@Component({
  selector: 'app-weekly-events-list',
  templateUrl: './weekly-events-list.component.html',
  styleUrls: ['./weekly-events-list.component.css']
})
export class WeeklyEventsListComponent implements OnInit {
  isLoading: boolean;
  weeklyEvents: WeeklyEvent[];

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getNearbyEvents().then(nearbyEvents => {
      this.weeklyEvents = [
        { day: 'Monday', events: [] },
        { day: 'Tuesday', events: [] },
        { day: 'Wednesday', events: [] },
        { day: 'Thursday', events: [] },
        { day: 'Friday', events: [] },
        { day: 'Saturday', events: [] },
        { day: 'Sunday', events: [] }
      ];
      nearbyEvents.forEach(event => {
        if (event.dayOfWeek) {
          this.weeklyEvents[event.dayOfWeek].events.push(event);
        }
      });
      this.weeklyEvents.forEach(weekly => weekly.events.sort((a, b) => b.startTime.localeCompare(a.startTime)));
      this.isLoading = false;
    });
  }
}
