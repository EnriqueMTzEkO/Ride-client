import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonCheckbox, IonInput } from '@ionic/angular/standalone';
import { UserInformationService } from 'src/app/services/user-information/user-information.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.page.html',
  styleUrls: ['./user-information.page.scss'],
  standalone: true,
  imports: [IonInput, IonCheckbox, IonLabel, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, ReactiveFormsModule]
})
export class UserInformationPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userInfo: UserInformationService,
    private cookies: CookieService
  ) { }

  userDataForm: FormGroup = this.formBuilder.group({
    name: ['',
      [
        Validators.required,
      ]
    ],
    phoneNumber: ['52',
      [
        Validators.required,
        Validators.pattern('^[0-9]{12}$')
      ]
    ],
      address: ['',
        [
          Validators.required,
        ]
      ],
      isDriver: [false],
      brand: ['',
        [
          Validators.required,
        ]
      ],
      model: ['',
        [
          Validators.required,
        ]
      ],
      year: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]{4}$')
        ]
      ],
      licensePlates: ['',
        [
          Validators.required,
          Validators.pattern('^(?=[A-Z]{3}-\d{4}$|[\d]{3}-[A-Z]{3}$)[A-Z0-9-]+$')
        ]
      ],
      driverLicense: ['',
        [
          Validators.required,
        ]
      ],
    });

  ngOnInit() {

  }

  getUser() {
    this.userInfo.getInfo().subscribe({
      next: (userData)  => {
        this.userDataForm.patchValue(userData);
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      },
      complete: () => console.info(`user data`)
    });
  }

  saveChanges() {
    const updatedUser = this.userDataForm.value;
    const userId = this.cookies.get('connect.sid');
  
    this.userInfo.updateInfo(userId, updatedUser).subscribe({
      next: (updatedUser) => {
        updatedUser.patchValue(updatedUser);
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      },
      complete: () => console.info(`user data`)
    });
  }
}