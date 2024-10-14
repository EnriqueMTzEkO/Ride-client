import { Component, input, OnInit } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonText } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, FormsModule, IonInput, IonItem, IonList, IonText, IonButton, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {}

    form: FormGroup = this.formBuilder.group({
      matricula: ['', Validators.required],
      password: ['', Validators.required],
    });

  signIn(e: Event) {
    e.preventDefault();

    this.authService.signIn(this.form.value).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/home']);  
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }
  
  ngOnInit() {
  }

  nav() {
    this.router.navigate(['/register']);
  }
}
