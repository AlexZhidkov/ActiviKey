import * as firebase from 'firebase/app';

export interface Event {
    id: string;
    title: string;
    placeId: string;
    placeName: string;
    address: string;
    coordinates: firebase.firestore.GeoPoint;
    occurrence: 'weekly' | 'one-off';
    startTime: string;
    description: string;
    imageUrl: string;
    date?: Date | firebase.firestore.Timestamp;
    dayOfWeek: number;
    tags: string[];
}
