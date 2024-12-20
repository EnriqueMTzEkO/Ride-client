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
})export class AddRouteMapComponent implements AfterViewInit {
  @Output() locationSelected = new EventEmitter<{ lat: number, lng: number }>();
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  map!: google.maps.Map;
  marker: google.maps.marker.AdvancedMarkerElement | null = null;

  constructor(private googleMapsLoader: GoogleMapsLoaderService) { }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  loadMap() {
    this.googleMapsLoader.load().then(() => {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 21.839708774067006, lng: -102.35386763837646 },
        zoom: 16,
        mapId: "DEMO_MAP_ID",
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // Listener click
      this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          const clickedLat = event.latLng.lat();
          const clickedLng = event.latLng.lng();
          this.addMarker({ lat: clickedLat, lng: clickedLng });
          console.log(clickedLat, clickedLng);
        }
      });
    }).catch(error => {
      console.error('Error loading Google Maps', error);
    });
  }

  addMarker(location: google.maps.LatLngLiteral) {
    this.locationSelected.emit({ lat: location.lat, lng: location.lng });
    if (this.marker) {
      // Actualiza la posición directamente
      this.marker.position = location;
    } else {
      // Si no existe, crea un nuevo marcador
      this.marker = new google.maps.marker.AdvancedMarkerElement({
        map: this.map,
        position: location,
        title: 'IDRK',
      });
    }
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

  searchAddress(address: string | number | null | undefined) {
    const geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ address }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        const latLng = { lat: location.lat(), lng: location.lng() }; // Obtener latitud y longitud
  
        this.map.setCenter(location);
        this.map.setZoom(16);
  
        // Google marker
        this.addMarker(latLng); // Llama a addMarker con las coordenadas
  
        console.log('Dirección encontrada:', results[0].formatted_address);
      } else {
        console.error('No se pudo encontrar la dirección: ', status);
      }
    });
  }
}
