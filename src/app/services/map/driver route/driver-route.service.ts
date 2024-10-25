import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class DriverRouteService {
  constructor(private apiService: ApiService) { }

  addRoute( data: { lat: number | null, lng: number | null, selectedTime: string | null } ) {
    return this.apiService.addRoute('/initroute', data);
  }
}
