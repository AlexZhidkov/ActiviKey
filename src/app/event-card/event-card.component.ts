import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MyEvent } from '../model/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: MyEvent;

  constructor(public service: AppService) { }

  ngOnInit(): void {
  }

  favoriteClicked(): void {
    this.event.isFavorite = !this.event.isFavorite;
    this.service.setFavorite(this.event);
  }

  register(): void {
    this.event.isRegistered = !this.event.isRegistered;
    this.service.registerForEvent(this.event);
  }
}
