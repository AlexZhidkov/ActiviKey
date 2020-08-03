import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppService } from '../app.service';
import { Event } from '../model/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  favorites: Event[];

  constructor(
    private service: AppService,
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.favorites = [];
    this.service.getSettings().then(s => {
      this.getFavorites(s.favorites).then(f => {
        this.favorites = f;
      });
    });
  }

  getFavorites(ids: string[]): Promise<Event[]> {
    const eventsRef = this.afs.collection('events');
    const promise = new Promise<Event[]>(async (resolve, reject) => {
      let events: Event[];
      try {
        events = (await Promise.all(ids.map(id => eventsRef.doc(id).get().toPromise())))
          .filter(doc => doc.exists)
          .map(doc => {
            const event = doc.data() as Event;
            event.id = doc.id;
            event.isFavorite = true;
            return event;
          });
      } catch (error) {
        console.log(`received an error in getFavorites method in module Home:`, error);
        resolve([]);
      }
      resolve(events);
    });
    return promise;
  }

}
