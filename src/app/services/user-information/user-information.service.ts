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

  updateInfo(userId: string, credentials: { name: string; phoneNumber: string; address: any[]; driver?: any }) {
    return this.apiService.put(`/userdata`, credentials);
  }
}
