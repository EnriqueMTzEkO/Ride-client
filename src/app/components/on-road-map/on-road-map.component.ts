import { Component, ElementRef, ViewChild, EventEmitter, Output, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { GoogleMapsLoaderService } from "src/app/services/map/google-maps-loader.service";
import { RouteService } from "../../services/map/routeServices/driver-route.service";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
declare let google: any;

@Component({
  selector: 'app-on-road-map',
  templateUrl: './on-road-map.component.html',
  standalone: true,
  styleUrls: ['./on-road-map.component.scss'],
  imports: [IonButton, CommonModule]
})
export class OnRoadMapComponent  implements OnInit {
  @Output() locationSelected = new EventEmitter<{ lat: number, lng: number }>();
  @ViewChild('mapElement', { static: true }) mapElement!: ElementRef;
  map!: google.maps.Map;
  marker: google.maps.marker.AdvancedMarkerElement | null = null;
  mapLoaded = false; // Bandera para saber si el mapa está cargado
  
  routeId!: string;
  driverData!: any;
  passengerData!: any;
  userCoords = {
    lat: 0,
    lng: 0
  };
  centerCoords = {
    lat: 21.840856,
    lng: -102.353815
  };
  
  constructor(private googleMapsLoader: GoogleMapsLoaderService, private routeService: RouteService, private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit(): void {
    this.routeId = this.route.snapshot.paramMap.get('id')!;
    this.getroutedata();
    setInterval(() => {
      this.getLocation();
    }, 10000);
  }
  
  getroutedata() {
    this.routeService.getRoute(this.routeId).subscribe(Data => {
      this.driverData = Data.driverData.driverDestination;
      this.passengerData = Data.offer[0].passengerData.passengerDestination;
      console.log(Data);
      this.loadMap();
    });
  }

  loadMap() {
    this.googleMapsLoader.load().then(() => {
      const mapOptions: google.maps.MapOptions = {
        center: { lat: this.centerCoords.lat, lng: this.centerCoords.lng },
        zoom: 18,
        mapId: "DEMO_MAP_ID",
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        preserveViewport: true
      });
      directionsRenderer.setMap(this.map);
  
      const start = { lat: 21.839708774067006, lng: -102.35386763837646 };  // Inicio
      const end = { lat: this.driverData.lat, lng: this.driverData.lng };  // Destino
      const waypoints = [{ location: { lat: this.passengerData.lat, lng: this.passengerData.lng }, stopover: true }];  // Waypoint
  
      this.calculateAndDisplayRoute(directionsService, directionsRenderer, start, waypoints, end);
      this.mapLoaded = true;
    }).catch(error => {
      console.error('Error loading Google Maps', error);
    });
  }

  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    start: { lat: number, lng: number },
    waypoints: { location: { lat: number, lng: number }, stopover: boolean }[],
    end: { lat: number, lng: number }
  ) {
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: waypoints
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK && response) {
        directionsRenderer.setDirections(response);
      } else {
        console.error('Error al calcular la ruta o la respuesta es nula: ', status);
      }
    });
  }
  
  async getLocation() {
    try {
      if (Capacitor.isNativePlatform()) {
        const permissionStatus = await Geolocation.checkPermissions();
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
  
        if (this.mapLoaded && this.map) {
          setTimeout(() => {
            this.map.setCenter({ lat: this.userCoords.lat, lng: this.userCoords.lng });
            this.map.setZoom(18);
          }, 500);
        }
      } else {
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
            this.userCoords.lat = position.coords.latitude;
            this.userCoords.lng = position.coords.longitude;
            console.log('Browser:', position);

            if (this.mapLoaded && this.map) {
              setTimeout(() => {
                this.map.setCenter({ lat: this.userCoords.lat, lng: this.userCoords.lng });
                this.map.setZoom(18);
              }, 500);
            } else {
              console.warn("Mapa aún no cargado");
            }
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
  

  endRide() {
    console.log("checar la locacion");
    this.routeService.finishRoute(this.routeId).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
