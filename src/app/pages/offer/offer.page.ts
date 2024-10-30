import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonText, IonItem, IonButton, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from 'src/app/services/map/routeServices/driver-route.service';
import { AddRouteMapComponent } from "../../components/add-route-map/add-route-map.component";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
  standalone: true,
  imports: [IonLabel, IonButton, IonItem, IonText, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, FormsModule, AddRouteMapComponent]
})
export class OfferPage implements OnInit {
  routeId!: string;
  lat: number | null = null;
  lng: number | null = null;
  priceForm: FormGroup;
  noAddress = false;
  noPrice = false;

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.priceForm = this.formBuilder.group({
      price: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.routeId = this.route.snapshot.paramMap.get('id')!; // get route Id from url
  }

  onLocationSelected(event: { lat: number, lng: number }) {
    this.lat = event.lat;
    this.lng = event.lng;
  }

  sendOffer() {
    const data = {
      price: this.priceForm.value.price,
      lat: this.lat,
      lng: this.lng,
      routeId: this.routeId,
    };
    if (!this.lat || !this.lng) {
      this.noAddress = true;
    } else {
      if(!this.priceForm.value.price){
        this.noPrice = true;
      } else {
        console.log('Datos a enviar:', data);
        this.routeService.addDestination(data).subscribe({
          next: (response) => {
            console.log('Datos enviados: ', response);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error', error);
          }
        });
      }
    }
  }
}
