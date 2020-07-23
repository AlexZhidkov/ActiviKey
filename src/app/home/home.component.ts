import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
