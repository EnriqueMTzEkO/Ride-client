import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonMenu, IonMenuButton, IonButtons, IonIcon, IonLabel, IonList, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ShowRouteMapComponent } from 'src/app/components/show-route-map/show-route-map.component';
import { AuthService } from '../../services/auth/auth.service';
;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenu, IonMenuButton, IonButtons, IonIcon, IonLabel, IonList, IonItem, ShowRouteMapComponent]
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
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

  goToGenereteRoute(){
    this.router.navigate(['/generate-rute'])
  }
}
