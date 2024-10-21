import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  signIn(credentials: { matricula: string; password: string }) {
    return this.apiService.post('/signin', credentials);
  }

  signUp(credentials: { matricula: string; password: string }) {
    return this.apiService.post('/signup', credentials);
  }

  logout() {
    return this.apiService.post('/logout', {});
  }

  isAuthenticated() {
    return this.apiService.get('/is-authenticated');
  }

  deleteAccount() {
    return this.apiService.delete('/user/delete');
  }
}
