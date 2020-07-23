import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import * as geofirestore from 'geofirestore';
import { Event } from '../model/event';

interface WeeklyEvent {
  day: string;
  events: Event[];
}

@Component({
  selector: 'app-weekly-events-list',
  templateUrl: './weekly-events-list.component.html',
  styleUrls: ['./weekly-events-list.component.css']
})
export class WeeklyEventsListComponent implements OnInit {
  isLoading: boolean;
  weeklyEvents: WeeklyEvent[];

  constructor() { }

  ngOnInit(): void {
    this.isLoading = true;
    this.weeklyEvents = [
      { day: 'Monday', events: [] },
      { day: 'Tuesday', events: [] },
      { day: 'Wednesday', events: [] },
      { day: 'Thursday', events: [] },
      { day: 'Friday', events: [] },
      { day: 'Saturday', events: [] },
      { day: 'Sunday', events: [] }
    ];
    const GeoFirestore = geofirestore.initializeApp(firebase.firestore());
    const myLocation = new firebase.firestore.GeoPoint(-32.0397559, 115.6813467); // Perth
    const geoCollection = GeoFirestore.collection('events');
    const query = geoCollection.near({ center: myLocation, radius: 1000 });

    query.get().then((value) => {
      value.docs.forEach(doc => {
        const event = doc.data();
        if (event.weekDay) {
          this.weeklyEvents[event.weekDay].events.push(event);
        }
      });
      this.weeklyEvents.forEach(weekly => weekly.events.sort((a, b) => b.startTime.localeCompare(a.startTime)));
      this.isLoading = false;
    });
  }

}
