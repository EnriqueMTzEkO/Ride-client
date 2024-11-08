import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonText, IonAlert } from '@ionic/angular/standalone';

@Component({
  selector: 'app-initialize-route',
  templateUrl: './initialize-route.page.html',
  styleUrls: ['./initialize-route.page.scss'],
  standalone: true,
  imports: [IonAlert, IonText, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InitializeRoutePage implements OnInit {

  userCoords = {
    lat: 0,
    lng: 0
  };
  centerCoords = {
    lat: 21.840856,
    lng: -102.353815
  };
  inRange!: boolean;


  constructor() { }

  ngOnInit() {
  }

  async initTrip() {
    await this.getLocation();
    this.inRange = this.isInRange(this.centerCoords.lat, this.centerCoords.lng, this.userCoords.lat, this.userCoords.lng, 1000);
    if(this.inRange == true){
      console.log("iniciar viaje");
    } else {
      console.log("No se encuentra cerca de la universidad");
    }
  }

  public ConfirmInitTrip = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Iniciar',
      role: 'confirm',
      handler: async () => {
        this.initTrip();
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  async getLocation() {
    try {
      if (Capacitor.isNativePlatform()) {
        const permissionStatus = await Geolocation.checkPermissions();
        console.log('Permission status:', permissionStatus.location);
  
        if (permissionStatus?.location !== 'granted') {
          const requestStatus = await Geolocation.requestPermissions();
          if (requestStatus.location !== 'granted') {
            console.error('Permission denied by app');
            return;
          }
        }
  
        const options: PositionOptions = {
          maximumAge: 5000,
          timeout: 15000,
          enableHighAccuracy: true
        };
        const position = await Geolocation.getCurrentPosition(options);
         this.userCoords.lat = position.coords.latitude;
         this.userCoords.lng = position.coords.longitude;
        console.log('Capacitor:', position);
      } else {
        console.log('Browser location');
        if (!navigator.geolocation) {
          console.error("Location not given");
          return;
        }
  
        const options: PositionOptions = {
          maximumAge: 5000,
          timeout: 15000,
          enableHighAccuracy: true
        };
  
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Browser:', position);
          },
          (error) => {
            console.error('Error: ', error);
          },
          options
        );
      }
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  }

  isInRange(lat1: any, lon1: any, lat2: any, lon2: any, maxDistancia: any) {
    const R = 6371000; // Radio de la Tierra en metros
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;

    console.log(distancia);

    if(distancia <= maxDistancia){
      console.log('Accepted');
      return true;
    } else {
      console.log('Not accepted')
      return false;
    }
  }

}
