import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env/environment';
import { Observable } from 'rxjs';
import { AgencyDto } from '../models/agency.dto';

@Injectable({ providedIn: 'root' })
export class AgenciesRepository {
  constructor(private readonly http: HttpClient) {}

  getById$(id: string): Observable<AgencyDto> {
    return this.http.get<AgencyDto>(`${environment.apiUrl}/agencies/${id}`);
  }
}
