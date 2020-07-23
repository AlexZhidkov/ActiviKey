import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../model/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;

  constructor() { }

  ngOnInit(): void {
  }

  openGoogleMap(placeId: string): void {
    window.location.href = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  }
}
