import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Event } from '../model/event';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {
  @Input() event: Event;

  constructor(public service: AppService) { }

  ngOnInit(): void {
  }
}
