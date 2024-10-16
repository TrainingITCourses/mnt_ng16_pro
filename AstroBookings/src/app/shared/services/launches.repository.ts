import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { LaunchDto, LaunchStatus } from '../models/launch.dto';

// npm run ng -- g s shared/services/launches-repository

@Injectable({
  providedIn: 'root',
})
export class LaunchesRepository {
  private readonly launches: LaunchDto[] = [
    {
      id: '1',
      agencyId: '1',
      rocketId: '1',
      date: new Date(2029, 5, 1),
      mission: 'Moon Landing',
      destination: 'Moon',
      pricePerSeat: 100,
      status: 'scheduled',
    },
    {
      id: '2',
      agencyId: '2',
      rocketId: '2',
      date: new Date(2033, 8, 2),
      mission: 'Mars Flight',
      destination: 'Mars',
      pricePerSeat: 200,
      status: 'scheduled',
    },
    {
      id: '3',
      agencyId: '3',
      rocketId: '3',
      date: new Date(2037, 11, 3),
      mission: 'Jupiter Mission',
      destination: 'Jupiter',
      pricePerSeat: 300,
      status: 'aborted',
    },
  ];

  getLaunchesByStatus$(status: LaunchStatus): Observable<LaunchDto[]> {
    return of(this.launches.filter((launch) => launch.status === status)).pipe(delay(2000));
  }
}
