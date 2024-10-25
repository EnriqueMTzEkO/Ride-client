/// <reference types="google.maps" />
import { AfterViewInit, Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { IonButton, IonInput } from '@ionic/angular/standalone';
import { GoogleMapsLoaderService } from "src/app/services/map/google-maps-loader.service";
import { CommonModule } from "@angular/common";
declare let google: any;

@Component({
  selector: 'app-add-route-map',
  templateUrl: './add-route-map.component.html',
  standalone: true,
  styleUrls: ['./add-route-map.component.scss'],
  imports: [CommonModule, IonButton, IonInput]
})
export class AddRouteMapComponent implements AfterViewInit {
  @Output() locationSelected = new EventEmitter<{ lat: number, lng: number }>();
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  map!: google.maps.Map;
  marker: google.maps.Marker | null = null;


  constructor(
    private googleMapsLoader: GoogleMapsLoaderService
  ) { }

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
  
      // Listener click
      this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const clickedLat = event.latLng.lat();
          const clickedLng = event.latLng.lng();
          console.log('Coordenadas seleccionadas:', clickedLat, clickedLng);
  
          // Get street name by coordinates
          this.getStreetNameFromCoordinates(clickedLat, clickedLng);
        }
      });
    }).catch(error => {
      console.error('Error loading Google Maps', error);
    });
  }

  getStreetNameFromCoordinates(lat: number, lng: number) {
    const geocoder = new google.maps.Geocoder();
    const latLng = { lat, lng };
  
    geocoder.geocode({ location: latLng }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        const streetName = results[0].formatted_address;
        console.log('Nombre de la calle:', streetName);
  
        // Center
        this.map.setCenter(latLng);
        this.map.setZoom(16);
  
        this.addMarker(latLng);
      } else {
        console.error('Geocodificación inversa fallida: ', status);
      }
    });
  }
  
  addMarker(location: google.maps.LatLngLiteral) {
    // Si ya existe un marcador, se actualiza su posición
    if (this.marker) {
      this.marker.setPosition(location);
    } else {
      // Si no existe, se crea un nuevo marcador
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });
    }
  }

  searchAddress(address: string | number | null | undefined) {
    const geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ address }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        this.map.setCenter(location);
        this.map.setZoom(16);
  
        // Google marker
        if (this.marker) {
          this.marker.setPosition(location);
        } else {
          // Si no existe, crea un nuevo marcador
          this.marker = new google.maps.Marker({
            position: location,
            map: this.map,
          });
        }
  
        console.log('Dirección encontrada:', results[0].formatted_address);
      } else {
        console.error('No se pudo encontrar la dirección: ', status);
      }
    });
  }
}
