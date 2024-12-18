import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.page.html',
  styleUrls: ['./localizacion.page.scss'],
})
export class LocalizacionPage implements OnInit {
  currentLocation: { lat: number; lng: number } | null = null;
  distanceToClosest: number | null = null;
  status: 'Habilitado' | 'Rechazado' = 'Rechazado';
  activeLocation: string | null = null;


  locations = [
    { name: 'Sede Alameda', lat: -33.4489, lng: -70.6693, radius: 1200 },
    { name: 'Sede Antonio Varas', lat: -33.4406, lng: -70.6236, radius: 1200 },
    { name: 'Sede Padre Alonso de Ovalle', lat: -33.4513, lng: -70.6553, radius: 1200 },
    { name: 'Sede Maipú', lat: -33.5019, lng: -70.7561, radius: 1200 },
    { name: 'Sede Melipilla', lat: -33.6891, lng: -71.2150, radius: 1200 },
    { name: 'Sede Plaza Norte', lat: -33.3678, lng: -70.6780, radius: 1200 },
    { name: 'Sede Plaza Oeste', lat: -33.4950, lng: -70.7140, radius: 1200 },
    { name: 'Sede Plaza Vespucio', lat: -33.5140, lng: -70.5980, radius: 1200 },
    { name: 'Sede Puente Alto', lat: -33.6117, lng: -70.5758, radius: 1200 },
    { name: 'Sede San Bernardo', lat: -33.5928, lng: -70.6996, radius: 1200 },
    { name: 'Sede San Carlos de Apoquindo', lat: -33.4031, lng: -70.5078, radius: 1200 },
    { name: 'Sede San Joaquín', lat: -33.4760, lng: -70.6400, radius: 1200 },
    { name: 'Sede Valparaíso', lat: -33.0458, lng: -71.6200, radius: 1200 },
    { name: 'Sede Viña del Mar', lat: -33.0245, lng: -71.5528, radius: 1200 },
    { name: 'Sede San Andrés de Concepción', lat: -36.8201, lng: -73.0444, radius: 1200 },
    { name: 'Campus Arauco', lat: -37.2460, lng: -73.3170, radius: 1200 },
    { name: 'Campus Nacimiento', lat: -37.5020, lng: -72.6760, radius: 1200 },
    { name: 'Campus Villarrica', lat: -39.2800, lng: -72.2270, radius: 1200 },
    { name: 'Sede Puerto Montt', lat: -41.4717, lng: -72.9360, radius: 1200 },
    { name: 'casa', lat: -33.6464, lng: -70.6640, radius: 1100 }
  ];

  constructor(private router: Router,private alertController: AlertController) {}

  async ngOnInit() {
    await this.getCurrentLocation();
  }


  async getCurrentLocation() {
    try {
      const permission = await Geolocation.requestPermissions();
      if (permission.location === 'granted') {
        const position = await Geolocation.getCurrentPosition();
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.checkProximity();
      } else {
        console.error('Permiso de ubicación no concedido.');
      }
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  checkProximity() {
    if (this.currentLocation) {
      let closestDistance = Infinity;
      let closestLocation = null;

      for (const location of this.locations) {
        const distance = this.calculateDistance(
          this.currentLocation.lat,
          this.currentLocation.lng,
          location.lat,
          location.lng
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestLocation = location;
        }
      }

      this.distanceToClosest = closestDistance;
      this.activeLocation = closestLocation?.name || null;

      if (closestLocation && closestDistance <= closestLocation.radius) {
        this.status = 'Habilitado';
      } else {
        this.status = 'Rechazado';
      }
    }
  }


  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3;

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
