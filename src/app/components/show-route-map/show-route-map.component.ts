import { AfterViewInit, Component, ElementRef, ViewChildren, QueryList, OnInit } from '@angular/core';
import { GoogleMapsLoaderService } from "src/app/services/map/google-maps-loader.service";
import { RouteService } from "../../services/map/routeServices/driver-route.service";
import { CommonModule } from "@angular/common";
import { IonText, IonButton } from "@ionic/angular/standalone";

declare let google: any;

@Component({
  selector: 'app-show-route-map',
  templateUrl: './show-route-map.component.html',
  standalone: true,
  styleUrls: ['./show-route-map.component.scss'],
  imports: [IonButton, IonText, CommonModule]
})
export class ShowRouteMapComponent implements OnInit {
  @ViewChildren('mapElement') mapElements!: QueryList<ElementRef>;

  maps: google.maps.Map[] = [];
  routes: any[] = [];  // store multiple route data
  directionsServices: google.maps.DirectionsService[] = [];
  directionsRenderers: google.maps.DirectionsRenderer[] = [];
  formattedDepartureTimes: string[] = [];

  constructor(private googleMapsLoader: GoogleMapsLoaderService, private RouteService: RouteService) {}

  uniCords = { lat: 21.839708774067006, lng: -102.35386763837646 };

  ngOnInit(): void {
    this.RouteService.getRoutes().subscribe(routeData => {
      console.log(routeData);
      if (routeData) {
        this.routes = routeData;  // Store all routes
        this.googleMapsLoader.load().then(() => {
          // Load all maps once Google Maps is ready
          this.loadAllMaps();
        }).catch(error => {
          console.error('Error loading Google Maps', error);
        });
      } else {
        console.log('No hay viajes');
      }
    });
  }

  loadAllMaps() {
    console.log('Cargando todos los mapas...');
    this.mapElements.forEach((mapElement, index) => {
      const mapOptions: google.maps.MapOptions = {
        center: this.uniCords,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
  
      const map = new google.maps.Map(mapElement.nativeElement, mapOptions);
      this.maps.push(map);
  
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
  
      this.directionsServices.push(directionsService);
      this.directionsRenderers.push(directionsRenderer);
  
      const start = { lat: this.uniCords.lat, lng: this.uniCords.lng };
      const end = {
        lat: this.routes[index].driverData.driverDestination.lat,
        lng: this.routes[index].driverData.driverDestination.lng
      };
  
      console.log('Start:', start, 'End:', end);

      const time = this.routes[index].driverData.driverDestination.departureTime;
      const fechaHora = new Date(time);
      const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true
      };
      const diaHoraFormateada = fechaHora.toLocaleString('es-ES', opciones);
      this.formattedDepartureTimes[index] = diaHoraFormateada;

      // Call function to display the route on the map
      this.calculateAndDisplayRoute(directionsService, directionsRenderer, start, end);
    });
  }

  calculateAndDisplayRoute(
    directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer,
    start: { lat: number, lng: number },
    end: { lat: number, lng: number }
  ) {
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
      } else {
        console.error('Error al calcular la ruta: ', status);
      }
    });
  }
}