import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment';
import { BookingDto } from '@app/models/booking.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingsRepository {
  constructor(private http: HttpClient) {}

  getByLaunchId$(id: string): Observable<BookingDto[]> {
    return this.http.get<BookingDto[]>(`${environment.apiUrl}/bookings?key=launchId&value=${id}`);
  }
}
