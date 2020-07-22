import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyEventsListComponent } from './weekly-events-list.component';

describe('WeeklyEventsListComponent', () => {
  let component: WeeklyEventsListComponent;
  let fixture: ComponentFixture<WeeklyEventsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyEventsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
