/// <reference types='@types/googlemaps' />
declare var google: any;

import { ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import * as geofirestore from 'geofirestore';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { EventData } from '../model/event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit, AfterViewInit {
  @ViewChild('addressInput', { static: false }) addressInput: any;

  isLoading = true;
  eventId: string;
  eventDate: Date;
  eventDoc: AngularFirestoreDocument<EventData>;
  event: Observable<EventData>;
  tagList: string[];
  readonly separatorKeysCodes: number[] = [ENTER];

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public service: AppService
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (!this.eventId) {
      const partner = this.route.snapshot.queryParamMap.get('partner');
      const partnerId = this.route.snapshot.queryParamMap.get('id');
      this.eventId = this.afs.createId();
      this.afs.collection('events')
        .doc(this.eventId)
        .set({
          partner,
          partnerId,
          occurrence: 'weekly',
          dayOfWeek: (new Date()).getDay() - 1,
          tags: []
        });
    }

    this.eventDoc = this.afs.collection('events').doc(this.eventId);
    this.event = this.eventDoc.valueChanges();
    this.event.subscribe(b => {
      if (b.date) {
        this.eventDate = (b.date as firebase.firestore.Timestamp).toDate();
      }
      this.tagList = b.tags;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.setupPlacesAutocomplete();
  }

  private setupPlacesAutocomplete(): void {
    // https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/places-autocomplete-addressform
    const options = {
      componentRestrictions: { country: 'AU' },
      fields: ['name', 'formatted_address', 'place_id', 'geometry.location']
    };

    const addressAutocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, options);
    addressAutocomplete.addListener('place_changed', () => {
      const place = addressAutocomplete.getPlace();
      const GeoFirestore = geofirestore.initializeApp(firebase.firestore());
      GeoFirestore.collection('events')
        .doc(this.eventId)
        .update({
          placeId: place.place_id,
          placeName: place.name,
          address: place.formatted_address,
          coordinates: new firebase.firestore.GeoPoint(place.geometry.location.lat(), place.geometry.location.lng())
        });
    });
  }

  updateEventDate(date: Date): void {
    this.eventDoc.update({ date, dayOfWeek: date.getDay() - 1 });
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
