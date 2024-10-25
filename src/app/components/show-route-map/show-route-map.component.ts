/// <reference types="google.maps" />
import { AfterViewInit, Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { IonButton, IonInput } from '@ionic/angular/standalone';
import { GoogleMapsLoaderService } from "src/app/services/map/google-maps-loader.service";
import { CommonModule } from "@angular/common";
declare let google: any;

@Component({
  selector: 'app-show-route-map',
  templateUrl: './show-route-map.component.html',
  standalone: true,
  styleUrls: ['./show-route-map.component.scss'],
  imports: [CommonModule, IonButton, IonInput]
})
export class ShowRouteMapComponent implements AfterViewInit {
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  map!: google.maps.Map;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;

  constructor(private googleMapsLoader: GoogleMapsLoaderService) {}

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    this.googleMapsLoader.load().then(() => {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 21.839708774067006, lng: -102.35386763837646 }, // Uni
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(this.map);
  
      // Llamar a la función para trazar la ruta
      this.calculateAndDisplayRoute();
    }).catch(error => {
      console.error('Error loading Google Maps', error);
    });
  }

  calculateAndDisplayRoute() {
    const start = { lat: 21.839708774067006, lng: -102.35386763837646 }; // Punto de inicio
    const end = { lat: 21.881138, lng: -102.292443 }; // Punto de destino

    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        // Renderizar la ruta en el mapa
        this.directionsRenderer.setDirections(response);
      } else {
        console.error('Error al calcular la ruta: ', status);
      }
    });
  }
}