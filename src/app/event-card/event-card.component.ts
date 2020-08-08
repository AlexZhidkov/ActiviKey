import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../app.service';
import { MyEvent } from '../model/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: MyEvent;
  showRegistrations: boolean;
  registrations: any[];

  constructor(
    public service: AppService,
    private afs: AngularFirestore,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.registrations = [];
    this.showRegistrations = false;
  }

  favoriteClicked(): void {
    this.event.isFavorite = !this.event.isFavorite;
    this.service.setFavorite(this.event);
  }

  register(): void {
    this.event.isRegistered = !this.event.isRegistered;
    this.service.registerForEvent(this.event);
  }

  showRegistrationsClicked(): void {
    this.showRegistrations = !this.showRegistrations;
    if (this.showRegistrations) {
      this.afs.collection<any>(`/events/${this.event.id}/registrations/${this.event.openRegistration}/users`)
        .valueChanges().subscribe(docs => {
          this.registrations = docs;
          if (!this.registrations.length) {
            this.registrations = [{ name: 'Nobody has registered yet' }];
          }
        });
    }
  }
}
