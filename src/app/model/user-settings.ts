import * as firebase from 'firebase/app';

export interface UserSettings {
    region: string;
    location: firebase.firestore.GeoPoint;
    radius: number;
}
