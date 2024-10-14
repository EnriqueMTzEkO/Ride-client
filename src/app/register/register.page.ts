import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CheckboxChangeEventDetail, IonButton, IonContent, IonHeader, IonInput, IonInputPasswordToggle, IonItem,
  IonLabel,
  IonList, IonRouterLink, IonText, IonTitle, IonToolbar, IonCheckbox } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IonCheckboxCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonItem, IonList, IonText, IonInputPasswordToggle, IonButton, IonRouterLink, IonLabel, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {}



    singupForm: FormGroup = this.formBuilder.group(
      {
        matricula: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{6}$')
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
          ]
        ],
        confirmPassword: ['', Validators.required],
        isAgreed: [false, Validators.requiredTrue]
      },
      { validators: this.passwordsMatchValidator() }
    );

  ngOnInit() {}

  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
  
      return password && confirmPassword && password.value !== confirmPassword.value
        ? { passwordsMismatch: true }
        : null;
    };
  }

  signUp(e: Event) {
    e.preventDefault();

    this.authService.signUp(this.singupForm.value).subscribe({
      next: () => {
        this.singupForm.reset();
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  navigateToprivacyNotice(){
    this.router.navigate(['/privacy-notice']);
  }

  navToLogin(){
    this.router.navigate(['/login']);
  }

}
