import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText } from '@ionic/angular/standalone';
import { RouteService } from 'src/app/services/map/routeServices/driver-route.service';
import { ShowRouteOffersComponent } from "src/app/components/show-route-offers/show-route-offers.component";

@Component({
  selector: 'app-check-offers',
  templateUrl: './check-offers.page.html',
  styleUrls: ['./check-offers.page.scss'],
  standalone: true,
  imports: [IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ShowRouteOffersComponent]
})
export class CheckOffersPage implements OnInit {
  offers!: any[];

  constructor(
    private driverRoute: RouteService ) { }

  ngOnInit() {
    
  }

}
