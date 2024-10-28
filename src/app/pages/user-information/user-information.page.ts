import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel, IonCheckbox, IonInput, IonText, IonBackButton } from '@ionic/angular/standalone';
import { UserInformationService } from 'src/app/services/user-information/user-information.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.page.html',
  styleUrls: ['./user-information.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonText, IonInput, IonCheckbox, IonLabel, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, ReactiveFormsModule]
})
export class UserInformationPage implements OnInit {
  userDataForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userInfo: UserInformationService) {

    this.userDataForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phoneNumber: ['52', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        neighborhood: ['', [Validators.required]],
        street: ['', [Validators.required]],
      }),
      driver: this.formBuilder.group({
        isDriver: [false],
        vehicle: this.formBuilder.group({
          brand: [''],
          model: [''],
          year: [''],
          licensePlates: [''],
          driverLicense: [''],
        }),
      }),
    });
    this.userDataForm.get('driver.isDriver')?.valueChanges.subscribe(value => {
      const vehicleGroup = this.userDataForm.get('driver.vehicle');
      if (value) {
        // Si es conductor, los campos de vehículo deben ser requeridos
        vehicleGroup?.get('brand')?.setValidators([Validators.required]);
        vehicleGroup?.get('model')?.setValidators([Validators.required]);
        vehicleGroup?.get('year')?.setValidators([Validators.required]);
        vehicleGroup?.get('licensePlates')?.setValidators([Validators.required]);
        vehicleGroup?.get('driverLicense')?.setValidators([Validators.required]);
      } else {
        // Si no es conductor, los campos de vehículo no son requeridos
        vehicleGroup?.get('brand')?.clearValidators();
        vehicleGroup?.get('model')?.clearValidators();
        vehicleGroup?.get('year')?.clearValidators();
        vehicleGroup?.get('licensePlates')?.clearValidators();
        vehicleGroup?.get('driverLicense')?.clearValidators();
      }
      vehicleGroup?.updateValueAndValidity(); // Actualizar validaciones
    });
  }

  ngOnInit() {
      this.loadUserData();
  }

  loadUserData() {
    this.userInfo.getInfo().subscribe(userData => {
      if (userData.length > 0) {
        const user = userData[0];
  
        // coincidr estructura del formulario
        const formattedData = {
          name: user.name,
          phoneNumber: user.phoneNumber,
          address: {
            city: user.address.city || '',
            neighborhood: user.address.neighborhood || '',
            street: user.address.street || '',
          },
          driver: {
            isDriver: user.driver.isDriver || false,
            vehicle: user.driver.isDriver ? {
              brand: user.driver.vehicle.brand || '',
              model: user.driver.vehicle.model || '',
              year: user.driver.vehicle.year || null,
              licensePlates: user.driver.vehicle.licensePlates || '',
              driverLicense: user.driver.vehicle.driverLicense || ''
            } : {}
          }
        };
  
        this.userDataForm.patchValue({
          name: formattedData.name,
          phoneNumber: formattedData.phoneNumber,
          address: formattedData.address,
          driver: formattedData.driver
        });
      } else {
        console.error("User information not found")
      }
    });
  }

  saveChanges() {
    const updatedUser = {
      ...this.userDataForm.value,
      address: this.userDataForm.value.address,
      driver: {
        isDriver: this.userDataForm.value.driver.isDriver,
        vehicle: this.userDataForm.value.driver.isDriver ? {
          brand: this.userDataForm.value.driver.vehicle.brand,
          model: this.userDataForm.value.driver.vehicle.model,
          year: Number(this.userDataForm.value.driver.vehicle.year),
          licensePlates: this.userDataForm.value.driver.vehicle.licensePlates,
          driverLicense: this.userDataForm.value.driver.vehicle.driverLicense
        } : {}
      }
    };
  
    this.userInfo.updateInfo(updatedUser).subscribe({
      next: (response) => {
        console.info('User data updated:', response);
      },
      error: (error) => {
        console.error('Error updating user data:', error);
      }
    });
  }
}