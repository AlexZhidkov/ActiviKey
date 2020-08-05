import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface EventData {
    id: string;
    title: string;
    partner: string;
    partnerId: string;
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

export interface MyEvent extends EventData {
    isFavorite: boolean;
    isRegistered: boolean;
}
