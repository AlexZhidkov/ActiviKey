import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import * as geofirestore from 'geofirestore';
import { Event } from '../model/event';

interface CalendarEvent {
  day: Date;
  weekday: string;
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

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    this.calendarEvents = [];
    const today = new Date();
    let weekday = today.getDay() - 1;
    if (weekday < 0) {
      weekday = 6;
    }
    const GeoFirestore = geofirestore.initializeApp(firebase.firestore());
    const myLocation = new firebase.firestore.GeoPoint(-32.0397559, 115.6813467); // Perth
    const geoCollection = GeoFirestore.collection('events');
    const query = geoCollection.near({ center: myLocation, radius: 1000 });

    query.get().then((value) => {
      value.docs.forEach(doc => {
        const event = doc.data();
        if (event.date) {
          event.date = event.date.toDate();
        }
        let addDays: number;
        if (!event.date && event.weekDay) {
          addDays = 0;
          if (event.weekDay >= weekday) {
            addDays = event.weekDay - weekday;
          } else {
            addDays = weekday - event.weekDay + 5;
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
      this.calendarEvents.sort((a, b) => (a.date.getTime() - b.date.getTime()));
      this.isLoading = false;
    });
  }

}
