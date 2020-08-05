/// <reference types='@types/googlemaps' />
declare var google: any;

import { ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as geofirestore from 'geofirestore';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { EventData } from '../model/event';
import { Partner } from '../model/partner';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css']
})
export class PartnerEditComponent implements OnInit, AfterViewInit {
  @ViewChild('addressInput', { static: false }) addressInput: any;

  isLoading = true;
  partnerId: string;
  partnerDate: Date;
  partnerDoc: AngularFirestoreDocument<Partner>;
  partner: Observable<Partner>;
  tagList: string[];
  events: Observable<EventData[]>;
  readonly separatorKeysCodes: number[] = [ENTER];

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    public service: AppService
  ) { }

  ngOnInit(): void {
    this.partnerId = this.route.snapshot.paramMap.get('id');
    if (!this.partnerId) {
      this.partnerId = this.afs.createId();
      this.afs.collection('partners')
        .doc(this.partnerId)
        .set({
          tags: []
        });
    }

    this.partnerDoc = this.afs.collection('partners').doc(this.partnerId);
    this.partner = this.partnerDoc.valueChanges();
    this.partner.subscribe(b => {
      this.tagList = b.tags;
      this.isLoading = false;
    });
    this.events = this.service.getEvents(this.partnerId);
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
      GeoFirestore.collection('partners')
        .doc(this.partnerId)
        .update({
          placeId: place.place_id,
          placeName: place.name,
          address: place.formatted_address,
          coordinates: new firebase.firestore.GeoPoint(place.geometry.location.lat(), place.geometry.location.lng())
        });
    });
  }

  addTag(partner: MatChipInputEvent): void {
    const input = partner.input;
    const value = partner.value;

    if ((value || '').trim()) {
      this.tagList.push(value.trim());
      this.partnerDoc.update({ tags: this.tagList });
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tagList.indexOf(tag);

    if (index >= 0) {
      this.tagList.splice(index, 1);
      this.partnerDoc.update({ tags: this.tagList });
    }
  }

}
