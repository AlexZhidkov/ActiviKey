export interface Event {
    id: string;
    title: string;
    placeId: string;
    placeName: string;
    address: string;
    coordinates: firebase.firestore.GeoPoint;
    startTime: string;
    description: string;
    imageUrl: string;
    weekDay: string;
    tags: string[];
}
