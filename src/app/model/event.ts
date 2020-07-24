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
    date?: Date;
    weekDay: number;
    tags: string[];
}
