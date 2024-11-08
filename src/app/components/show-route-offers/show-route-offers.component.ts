import { Component, ElementRef, ViewChildren, QueryList, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { IonText, IonButton } from "@ionic/angular/standalone";
import { GoogleMapsLoaderService } from 'src/app/services/map/google-maps-loader.service';
import { RouteService } from "../../services/map/routeServices/driver-route.service";

@Component({
  selector: 'app-show-route-offers',
  templateUrl: './show-route-offers.component.html',
  standalone: true,
  styleUrls: ['./show-route-offers.component.scss'],
  imports: [IonButton, IonText, CommonModule]
})
export class ShowRouteOffersComponent  implements OnInit {
  @ViewChildren('mapElement') mapElements!: QueryList<ElementRef>;

  routeId!: string;
  maps: google.maps.Map[] = [];
  destination: any;
  offers: any[] = [];  // store multiple route data
  driverDestination!: any;
  directionsServices: google.maps.DirectionsService[] = [];
  directionsRenderers: google.maps.DirectionsRenderer[] = [];

  constructor(private googleMapsLoader: GoogleMapsLoaderService, private RouteService: RouteService, private router: Router, private route: ActivatedRoute,) {}

  uniCords = { lat: 21.839708774067006, lng: -102.35386763837646 };

  ngOnInit(): void {
    this.routeId = this.route.snapshot.paramMap.get('id')!;
    this.RouteService.getRoute(this.routeId).subscribe(driverData => {
      this.driverDestination = driverData.driverData;
      this.RouteService.getUserOffers().subscribe(routeOffers => {
        console.log(routeOffers);
        this.offers = routeOffers;
        console.log(this.offers);
        this.googleMapsLoader.load().then(() => {
          this.loadAllMaps();
        }).catch(error => {
          console.error('Error loading Google Maps', error);
        });
      });
    });
  }
  

  loadAllMaps() {
    console.log('Cargando todos los mapas...');
    this.mapElements.forEach((mapElement, offerIndex) => {
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

      // Check if driver destination data exists
    if (!this.driverDestination || !this.driverDestination.driverDestination) {
      console.error('Driver destination data is missing.');
      return;
    }

    // Check if passenger destination data for this offer exists
    if (!this.offers[offerIndex].passengerData.passengerDestination) {
      console.error(`Offer data for index ${offerIndex} is missing destination coordinates.`);
      return;
    }
  
      // inicio y fin
      const start = { lat: this.uniCords.lat, lng: this.uniCords.lng };
      const end = {
        lat: this.driverDestination.driverDestination.lat,
        lng: this.driverDestination.driverDestination.lng
      };
      // waypoints
      const waypoints = [{
        location: {
          lat: this.offers[offerIndex].passengerData.passengerDestination.lat,
          lng: this.offers[offerIndex].passengerData.passengerDestination.lng
        },
        stopover: true
      }];
      console.log('Start:', start, 'End:', end, 'Waypoints:', waypoints);
  
      // Llamar a la función para calcular y mostrar la ruta con los waypoints
      this.calculateAndDisplayRoute(directionsService, directionsRenderer, start, waypoints, end);
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
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(response);
      } else {
        console.error('Error al calcular la ruta: ', status);
      }
    });
  }

  acceptOffer(offerId: string){
    const data = {
      routeId: this.routeId,
      offerAccepted: offerId
    }

    console.log(data);
    this.RouteService.aceptOffer(data).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate([`/initialize-route/${offerId}`])
      },
      error: (error) => {
        console.error("error accepting offer:", error);
      }
    })
  }
  
}