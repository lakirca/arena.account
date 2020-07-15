import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  constructor(private http: HttpClient) {}

  getTickets() {
    return this.http.get('support/tickets');
  }
}
