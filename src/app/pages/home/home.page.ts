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
    this.hasARoute();
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
  
  hasARoute() {
    this.driverRoute.getUserRoutes().subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          console.log('No tienes viajes en curso');
          return;
        }
        const route = res[0]._id;
        switch (res[0].status) {
          case 'OnRoute':
            this.router.navigate([`/on-route/${route}`]);
            break;
          case 'Accepted':
            this.router.navigate([`/initialize-route/${res[0].offer[0]._id}`])
            break;
          default:
            console.log('Estado desconocido de la ruta');
        }
      }
    });
    this.driverRoute.waitingForPassenger().subscribe({
      next: (res) => {
        console.log(res);
        if(!res || res.length == 0){
          console.log("no tienes viajes en curso");
        } else {
          this.routeData = res.data;
          const routeId = this.routeData._id;
          if(this.routeData.status == 'Accepted'){
            this.router.navigate([`/offer-acceped/${this.routeData._id}`]);
          } else{
            this.router.navigate([`/check-offers/${routeId}`])
          }
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  

  goTocheckOffers(){
    this.driverRoute.getUserRoutes().subscribe({
      next: (res) => {
        console.log(res);
        if (!res || res.length === 0) {
          console.log('No tienes viajes en curso');
          return;
         } else {
          this.routeData = res;
         const routeId = this.routeData._id;
         if(this.routeData.status == 'Acepted'){
           this.router.navigate([`/initialize-route/${this.routeData.offer[0]._id}`]);
         } else{
           this.router.navigate([`/check-offers/${routeId}`])
         }
        }
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
