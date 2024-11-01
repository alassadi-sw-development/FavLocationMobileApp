import uuid from 'react-native-uuid';

export class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = { lat: location.lat, lng: location.lng }; // {lat: 0.451248, lng: 172.48751}
    this.id = uuid.v4(); // Generates a unique ID using react-native-uuid
  }
}
