import * as firebase from 'firebase/app';
import 'firebase/firestore';

export interface Partner {
    id: string;
    title: string;
    placeId: string;
    placeName: string;
    address: string;
    coordinates: firebase.firestore.GeoPoint;
    description: string;
    imageUrl: string;
    videoYouTubeUrl: string;
    website: string;
    tags: string[];
}
