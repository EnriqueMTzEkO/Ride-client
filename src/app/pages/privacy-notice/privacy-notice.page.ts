import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonList, IonListHeader, IonLabel, IonItem, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-privacy-notice',
  templateUrl: './privacy-notice.page.html',
  styleUrls: ['./privacy-notice.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonItem, IonLabel, IonListHeader, IonList, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PrivacyNoticePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
