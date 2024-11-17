import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText } from '@ionic/angular/standalone';
import { RouteService } from 'src/app/services/map/routeServices/driver-route.service';
import { ShowRouteOffersComponent } from "src/app/components/show-route-offers/show-route-offers.component";
import { Router } from '@angular/router';

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
    private driverRoute: RouteService, private router: Router,) { }

  ngOnInit() {
    this.hasARoute();
  }

  hasARoute(){
    this.driverRoute.getUserRoutes().subscribe({
      next: (res) => {
        if(!res || res.length == 0){
          console.log('no tienes viajes en curso');
        } else{
          const route =res[0]._id;
          console.log(route);
          if(res[0].status == 'OnRoute'){
            this.router.navigate([`/on-route/${route}`]);
          }
        }
      }
    })
  }

}
