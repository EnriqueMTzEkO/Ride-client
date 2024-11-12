import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnRoadMapComponent } from "src/app/components/on-road-map/on-road-map.component";
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-on-route',
  templateUrl: './on-route.page.html',
  styleUrls: ['./on-route.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, OnRoadMapComponent]
})
export class OnRoutePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
