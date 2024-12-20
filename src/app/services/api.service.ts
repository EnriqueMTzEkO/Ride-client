import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:3000';

  post(url: string, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}${url}`, body, {
      withCredentials: true,
    });
  }

  get(url: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}${url}`, {
      withCredentials: true,
    });
  }

  put(url: string, body: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}${url}`, body, {
      withCredentials: true,
    });
  }

  delete(url: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}${url}`, {
      withCredentials: true,
    });
  }
}
