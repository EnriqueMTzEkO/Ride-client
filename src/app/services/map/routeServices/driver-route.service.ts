import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  constructor(private apiService: ApiService) { }

  addRoute( data: { lat: number | null, lng: number | null, selectedTime: string | null } ) {
    return this.apiService.post('/routes', data);
  }

  getRoutes(){
    return this.apiService.get('/routes')
  }
}
