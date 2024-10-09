import { Injectable } from '@angular/core';
import { LaunchDto } from 'src/app/shared/models/launch.dto';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor() {}
  loadNextLaunches(): LaunchDto[] {
    return [
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
  }
}
