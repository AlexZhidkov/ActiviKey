import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Partner } from '../model/partner';

@Component({
  selector: 'app-partner-card',
  templateUrl: './partner-card.component.html',
  styleUrls: ['./partner-card.component.css']
})
export class PartnerCardComponent implements OnInit {
  @Input() partner: Partner;

  constructor(public service: AppService) { }

  ngOnInit(): void {
  }

}
