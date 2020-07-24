import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import * as geofirestore from 'geofirestore';
import { Event } from './model/event';
import { UserSettings } from './model/user-settings';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  getSettings(): Promise<UserSettings> {
    const promise = new Promise<UserSettings>((resolve, reject) => {
      this.auth.user.subscribe(user => {
        const settingsDoc = this.afs.doc<any>(`users/${user.uid}`);
        settingsDoc.get().subscribe(doc => {
          const data = doc.data();
          const settings: UserSettings = {
            region: data.region,
            location: data.location,
            radius: data.radius
          };
          resolve(settings);
        });
      });
    });
    return promise;
  }

  getNearbyEvents(): Promise<Event[]> {
    const promise = new Promise<Event[]>((resolve, reject) => {
      this.getSettings().then(settings => {
        if (!(settings.location && settings.radius)) {
          this.router.navigate(['settings']);
        }
        const GeoFirestore = geofirestore.initializeApp(firebase.firestore());
        const geoCollection = GeoFirestore.collection('events');
        const query = geoCollection.near({ center: settings.location, radius: settings.radius });
        query.get().then((value) => {
          const events = value.docs.map(e => {
            const event = e.data();
            if (event.date) {
              event.date = event.date.toDate();
            }
            return event;
          });
          resolve(events);
        });
      });
    });
    return promise;
  }
}
