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

  getRoute(routeId: any){
    return this.apiService.get(`/routes/${routeId}`);
  }

  addDestination( data: { lat: number | null, lng: number | null, routeId: string | null } ) {
    return this.apiService.put('/routes', data);
  }

  getUserRoutes(){
    return this.apiService.get(`/routes/user`);
  }

  getUserOffers(){
    return this.apiService.get(`/routes/offers`);
  }

  aceptOffer( data: { routeId: any, offerAccepted: any } ){
    return this.apiService.put('/routes/offers/acepted', data);
  }

  initRoute(data: {offerId: any}){
      return this.apiService.put(`/routes/offers/init`, data);
  }

  redirectToRoute(){
    return this.apiService.get(`/routes/offers/init`);
  }

  finishRoute(routeId: any){
    return this.apiService.delete(`/routes/offers/finish/${routeId}`);
  }
}
