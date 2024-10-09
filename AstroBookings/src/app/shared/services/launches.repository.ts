import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { LaunchDto } from '../models/launch.dto';

// npm run ng -- g s shared/services/launches-repository

@Injectable({
  providedIn: 'root',
})
export class LaunchesRepository {
  // toDo: $ suffix
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
  ];

  getNextLaunches$(): Observable<LaunchDto[]> {
    return of(this.launches).pipe(delay(2000));
  }
}
