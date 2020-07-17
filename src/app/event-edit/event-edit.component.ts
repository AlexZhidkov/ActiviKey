import { ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  isLoading = true;
  eventId: string;
  eventDoc: AngularFirestoreDocument<Event>;
  event: Observable<Event>;
  tagList: string[];
  readonly separatorKeysCodes: number[] = [ENTER];

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (!this.eventId) {
      this.eventId = this.afs.createId();
      this.afs.collection('events')
        .doc(this.eventId)
        .set({
          tags: []
        });
    }
    this.eventDoc = this.afs.collection('events').doc(this.eventId);
    this.event = this.eventDoc.valueChanges();
    this.event.subscribe(b => {
      this.tagList = b.tags;
      this.isLoading = false;
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tagList.push(value.trim());
      this.eventDoc.update({ tags: this.tagList });
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tagList.indexOf(tag);

    if (index >= 0) {
      this.tagList.splice(index, 1);
      this.eventDoc.update({ tags: this.tagList });
    }
  }

}
