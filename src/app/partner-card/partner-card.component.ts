import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppService } from '../app.service';
import { Event } from '../model/event';
import { Partner } from '../model/partner';

@Component({
  selector: 'app-partner-card',
  templateUrl: './partner-card.component.html',
  styleUrls: ['./partner-card.component.css']
})
export class PartnerCardComponent implements OnInit {
  @Input() partner: Partner;
  showEvents: boolean;
  events: Observable<Event[]>;

  constructor(
    public service: AppService
  ) { }

  ngOnInit(): void {
    this.showEvents = false;
  }

  eventsToggleChanged(isChecked: any): void {
    if (isChecked) {
      this.events = this.service.getEvents(this.partner.id);
    }
  }
}
