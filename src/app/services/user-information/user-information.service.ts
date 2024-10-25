import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {

  constructor(private apiService: ApiService) { }

  getInfo() {
    return this.apiService.get('/userdata');
  }

  updateInfo(data: {name: string; phoneNumber: string;
    address: {
      city: string;
      neighborhood: string;
      street: string;
    };
    driver: {
      isDriver: boolean;
      vehicle?: {
        brand: string;
        model: string;
        year: number;
        licensePlates: string;
        driverLicense: string;
      };
    };
  }) {
    return this.apiService.put('/userdata', data);
  }
  // Realmente solo se usa si put falla
  addInfo(data: {name: string; phoneNumber: string;
    address: {
      city: string;
      neighborhood: string;
      street: string;
    };
    driver: {
      isDriver: boolean;
      vehicle?: {
        brand: string;
        model: string;
        year: number;
        licensePlates: string;
        driverLicense: string;
      };
    };
  }) {
    return this.apiService.post(`/userdata`, data);
  }
}
