import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Component({
  selector: 'app-events-management',
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management.component.css']
})
export class EventsManagementComponent implements OnInit {
  isLoading = true;
  private eventsCollection: AngularFirestoreCollection<Event>;
  events: Observable<Event[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.eventsCollection = this.afs.collection<Event>('events');
    this.events = this.eventsCollection.valueChanges({ idField: 'id' });
    this.isLoading = false;
  }

}
