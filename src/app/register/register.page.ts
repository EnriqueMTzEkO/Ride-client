import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonInput, IonInputPasswordToggle, IonItem,
  IonLabel,
  IonList, IonRouterLink, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonItem, IonList, IonText, IonInputPasswordToggle, IonButton, IonRouterLink, IonLabel]
})
export class RegisterPage implements OnInit {
  matricula: string = "";
  password: string = "";
  confirmPassword: string = "";
  isAgreed: boolean = false;
  
  constructor(private router: Router) {}

  ngOnInit() {
  }

  onSubmit() {
    if (!this.isFormValid()) {
      return;
    }
    // Lógica para enviar el formulario
    console.log('Formulario válido. Procesando...');
  }

  isFormValid(): boolean {
    if (!this.matricula || !/^[0-9]{6}$/.test(this.matricula)) {
      return false;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!this.password || !passwordPattern.test(this.password)) {
      return false;
    }

    if (this.password !== this.confirmPassword) {
      return false;
    }
    return true;
  }

  onCheckboxChange(event: any) {
    this.isAgreed = event.detail.checked;
  }

  navigateToprivacyNotice(){
    this.router.navigate(['/privacy-notice']);
  }

  navToLogin(){
    this.router.navigate(['/login']);
  }

}
