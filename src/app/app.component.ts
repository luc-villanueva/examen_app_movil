import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentPosition: { lat: number, lng: number } | null = null;
  constructor() {}
  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log('Current Position:', this.currentPosition);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }
}
