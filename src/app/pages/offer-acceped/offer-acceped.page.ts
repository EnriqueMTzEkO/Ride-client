import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText } from '@ionic/angular/standalone';
import { RouteService } from 'src/app/services/map/routeServices/driver-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-acceped',
  templateUrl: './offer-acceped.page.html',
  styleUrls: ['./offer-acceped.page.scss'],
  standalone: true,
  imports: [IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OfferAccepedPage implements OnInit {

  constructor(private driverRoute: RouteService, private router: Router) { }

  ngOnInit() {
    this.driverRoute.waitingForPassenger().subscribe({
      next: (res) => {
        console.log(res);
        const routeData = res.data;
          if(routeData.status == 'OnRoute'){
            this.router.navigate([`/on-route/${routeData._id}`]);
          }
        },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
