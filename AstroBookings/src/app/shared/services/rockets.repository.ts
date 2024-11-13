import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment';
import { RocketDto } from '@app/models/rocket.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RocketsRepository {
  constructor(private http: HttpClient) {}

  getById$(id: string): Observable<RocketDto> {
    return this.http.get<RocketDto>(`${environment.apiUrl}/rockets/${id}`);
  }
}
