/// <reference types='@types/googlemaps' />
declare var google: any;
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { UserSettings } from '../model/user-settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  @ViewChild('locationInput', { static: false }) locationInput: any;

  settingsDoc: AngularFirestoreDocument<UserSettings>;
  settings: Observable<UserSettings>;
  isLoading: boolean;
  location: string;

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.auth.user.subscribe(user => {
      this.settingsDoc = this.afs.doc<UserSettings>(`users/${user.uid}`);
      this.settings = this.settingsDoc.valueChanges();
      this.settings.subscribe(_ => this.isLoading = false);
    });
  }

  ngAfterViewInit(): void {
    this.setupPlacesAutocomplete();
  }

  private setupPlacesAutocomplete(): void {
    // https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/examples/places-autocomplete-addressform
    const options = {
      componentRestrictions: { country: 'AU' },
      types: ['(regions)'],
      fields: ['formatted_address', 'geometry.location']
    };

    const addressAutocomplete = new google.maps.places.Autocomplete(this.locationInput.nativeElement, options);
    addressAutocomplete.addListener('place_changed', () => {
      const place = addressAutocomplete.getPlace();
      this.settingsDoc.update({
        region: place.formatted_address,
        location: new firebase.firestore.GeoPoint(place.geometry.location.lat(), place.geometry.location.lng())
      });
    });

  }

}
