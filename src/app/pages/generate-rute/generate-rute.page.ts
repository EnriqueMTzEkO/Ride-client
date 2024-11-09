import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonButton, IonDatetime, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { AddRouteMapComponent } from "../../components/add-route-map/add-route-map.component";
import { RouteService } from "../../services/map/routeServices/driver-route.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-rute',
  templateUrl: './generate-rute.page.html',
  styleUrls: ['./generate-rute.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonDatetime, IonButton, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, AddRouteMapComponent]
})
export class GenerateRutePage implements OnInit {

  lat: number | null = null;
  lng: number | null = null;
  selectedTime!: string;
  locationSelected!: boolean;
  minDateTime: string;
  maxDateTime: string;
  validTime: boolean = true;
  errorGeneratingRote: boolean = false;
  hasActiveRoute = false;
  time = '';

  constructor(private driverRoute: RouteService,
    private router: Router
  ){
    const now = new Date();

    now.setHours(0, 0, 0, 0);
    this.minDateTime = now.toISOString();
    const maxDaysAfter = 7;  
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + maxDaysAfter);
    this.maxDateTime = futureDate.toISOString();
  }

  ngOnInit(): void {
    console.log(this.selectedTime);
  }

  onLocationSelected(event: { lat: number, lng: number }) {
    this.lat = event.lat;
    this.lng = event.lng;
    console.log('Latitud seleccionada:', this.lat, 'Longitud seleccionada:', this.lng);
  }
  

  onTimeChange(event: any) {
    this.selectedTime = event.detail.value;
    this.validTime = true;
    
    const fechaHora = new Date(this.selectedTime);
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: true
    };
    const diaHoraFormateada = fechaHora.toLocaleString('es-ES', opciones);
    this.time = diaHoraFormateada;
  }

  onSubmit() {
    const data = {
      lat: this.lat,
      lng: this.lng,
      selectedTime: this.selectedTime
    };

    console.log(this.selectedTime);

    if (this.selectedTime) {
      const selectedDateTime = new Date(this.selectedTime);
      const currentDateTime = new Date();
    
      if (selectedDateTime > currentDateTime) {
        this.validTime = true;
        this.addRoute(data);
        console.log("valido: " + this.validTime);
      } else {
        this.validTime = false;
        console.log("no valido: " + this.validTime);
      }
    } else {
      this.validTime = false;
      console.log("no valido: " + this.validTime);
    }

  }

  addRoute(data: { lat: number | null, lng: number | null, selectedTime: string | null }) {
    console.log(data);
    this.driverRoute.addRoute(data).subscribe({
      next: (response) => {
        console.log('Datos enviados: ', response);
        this.errorGeneratingRote = false;
        this.router.navigate(['/home'])
      },
      error: (error) => {
        console.error('Error', error);
        if(error.error.message == "User has a route in progress"){
          this.hasActiveRoute = true;
        } else{ 
          if(error.status == 400){
            this.locationSelected = false;
          } else{
            this.errorGeneratingRote = true;
          }
        }
      }
    });
  }
}