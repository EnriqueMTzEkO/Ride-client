import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonMenu, IonMenuButton, IonButtons, IonIcon, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ShowRouteMapComponent } from 'src/app/components/show-route-map/show-route-map.component';
import { AuthService } from '../../services/auth/auth.service';
import { RouteService } from 'src/app/services/map/routeServices/driver-route.service';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenu, IonMenuButton, IonButtons, IonIcon, IonLabel, IonList, IonItem, ShowRouteMapComponent]
})
export class HomePage implements OnInit {
  routeData!: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private driverRoute: RouteService 
  ) { }

  ngOnInit() {

  }

  logout(){
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
      },
    }); 
  }

  goToUserInfo() {
    this.router.navigate(['/user-information']);
  }

  goToAccount(){
    this.router.navigate(['/account'])
  }

  goTocheckOffers(){
    this.driverRoute.getUserRoutes().subscribe({
      next: (routeData) => {
        console.log(routeData);
        this.routeData = routeData;
        const routeId = this.routeData[0]._id;
        this.router.navigate([`/check-offers/${routeId}`])
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  goToGenereteRoute(){
    this.router.navigate(['/generate-rute'])
  }
}
