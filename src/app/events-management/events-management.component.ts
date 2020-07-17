import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-management',
  templateUrl: './events-management.component.html',
  styleUrls: ['./events-management.component.css']
})
export class EventsManagementComponent implements OnInit {
  isLoading = true;

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
  }

}
